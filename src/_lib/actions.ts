"use server";

import { revalidatePath } from "next/cache";
import { auth, signOut } from "./auth";
import { signIn } from "./auth";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

type ProductAddFormData = {
  title: string;
  quantity: number;
  price: number;
  image: File | string;
  category_name: string;
  category_type: string;
};

// Add New Product

export async function addNewProduct(data: ProductAddFormData) {
 if (!(data.image instanceof File)) {
    throw new Error("Invalid image. Expected a File.");
  }
  const file = data.image;
  const bucket = data.category_type.toLowerCase(); // should be one of "men", "women", "children"

  const imageName = `${Date.now()}-${file.name}`.replaceAll("/", "");

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(imageName, file);

  if (uploadError) {
    console.error("Image upload failed:", uploadError.message);
    throw new Error(uploadError.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(imageName);

  const imageUrl = publicUrlData.publicUrl;

  const productData = {
    ...data,
    image: imageUrl,
  };

  const { error: dbError } = await supabase
    .from("Products")
    .insert([productData]);

  if (dbError) {
    console.error("DB insert failed:", dbError.message);
    throw new Error(dbError.message);
  }
}

type ProductEditFormData = {
  title: string;
  quantity: number;
  price: number;
  image: File | string;
  category_name: string;
  category_type: string;
};

// Update product
export async function updateProduct(id: string, data: ProductEditFormData) {
  if (!data) throw new Error("No data provided.");

  let imageUrl = "";

  // 1. Check if a new image is uploaded
  if (data.image instanceof File) {
    const bucket = data.category_type?.toLowerCase?.();
    if (!bucket) throw new Error("Missing or invalid category_type.");

    const imageName = `${Date.now()}-${data.image.name}`.replaceAll("/", "");

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(imageName, data.image, {
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error("Image upload error:", uploadError);
      throw new Error(uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(imageName);

    imageUrl = publicUrl;
  } else {
    // 2. No new image uploaded — fetch existing image from DB
    const { data: existingProduct, error: fetchError } = await supabase
      .from("Products")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching existing product image:", fetchError);
      throw new Error(fetchError.message);
    }

    imageUrl = existingProduct.image;
  }

  // 3. Update product with the resolved image URL
  const { error } = await supabase
    .from("Products")
    .update({
      ...data,
      image: imageUrl,
    })
    .eq("id", id);

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/products/editproduct");
}

// Delete Product
export async function deleteProduct(id: number) {
  const { error } = await supabase.from("Products").delete().eq("id", id);
  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
  revalidatePath("/dashboard/products/editproduct");
}
export async function updateProductQuantity(id: string, decreaseBy: number) {
  const { data: product, error: fetchError } = await supabase
    .from("Products")
    .select("quantity")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const newQuantity = product.quantity - decreaseBy;

  const { error: updateError } = await supabase
    .from("Products")
    .update({ quantity: newQuantity })
    .eq("id", id);

  if (updateError) throw new Error(updateError.message);

  return { id, quantity: newQuantity };
}

interface Order {
  productId: string;
  userId: number;
  title: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
  orderStatus: string;
}
// Make Order
export async function makeOrder(order: Order) {
  const { error } = await supabase.from("Orders").insert([order]);

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message); // or error.details
  }
}

interface ProfileFormData {
  phoneNumber: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  nationality: string;
}

export async function completeProfile(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Convert FormData to plain object
  const rawData = Object.fromEntries(formData.entries());

  const data: ProfileFormData = {
    phoneNumber: rawData.phoneNumber as string,
    streetAddress: rawData.streetAddress as string,
    apartment: rawData.apartment as string,
    city: rawData.city as string,
    state: rawData.state as string,
    postalCode: rawData.postalCode as string,
    country: rawData.country as string,
    nationality: rawData.nationality as string,
  };

  const { error } = await supabase
    .from("Users")
    .update(data)
    .eq("id", session.user.userId);

  revalidatePath("/profile/settings");

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }
}

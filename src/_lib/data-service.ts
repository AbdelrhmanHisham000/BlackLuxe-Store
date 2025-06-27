import { supabase } from "./supabase";


export async function getAllProducts<T>(type?: string): Promise<T[]> {
  try {
    let query = supabase
      .from("Products")
      .select("*")
      .order("created_at", { ascending: true }); 

    if (type) query = query.eq("category_type", type);

    const { data: Products, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      return [] as T[];
    }

    return Products as T[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [] as T[];
  }
}

export async function updateProduct(id: string, decreaseBy: number) {
  const { data: product, error: fetchError } = await supabase
    .from("Products")
    .select("quantity")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  const newQuantity = product.quantity - decreaseBy;

  const { error: updateError } = await supabase
    .from("Products")
    .update({ quantity: newQuantity })
    .eq("id", id);

  if (updateError) throw updateError;

  return { id, quantity: newQuantity };
}

export async function getUser(email: string ) {
  const { data } = await supabase
    .from("Users")
    .select("*")
    .eq("email", email)
    .single();
  return data;
}

export async function getAllUsers() {
  const { data: Users, error } = await supabase.from("Users").select("*");
  if (error) {
    console.error("Error fetching products:", error);
    throw new Error("User could not be created");
  }
  return Users;
}

interface userProps {
  fullName: string;
  email: string;
}

export async function createUser(newUser: userProps) {
  const { data, error } = await supabase
    .from("Users")
    .insert([newUser])
    .select();
  if (error) {
    console.error("Error fetching products:", error);
    throw new Error("User could not be created");
  }
  return data;
}

export async function getOrders() {
  const { data: Orders, error } = await supabase
    .from("Orders")
    .select("*, userId(*)");

  if (error) {
    console.error("Error fetching Orders:", error);
  }

  return Orders;
}

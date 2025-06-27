
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

type Product = {
  id: number;
  created_at: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category_type: string;
  category_name?: string;
  type?: string;
  colors?: string[];
  sizes?: string[];
};

type ProductPayload = {
  title: string;
  quantity: number;
  price: number;
  category_name: string;
  category_type: string;
  colors: string[];
  sizes: string[];
  image: File | string;
};

type Props = {
  styles: string;
  buttonText: string;
  product?: Partial<Product>;
  func: (id: string, data: ProductPayload) => Promise<void>;
};

// ✅ Define Zod schema with colors and sizes as optional comma-separated strings
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  quantity: z.number().min(1, "Quantity is required"),
  price: z.number().min(1, "Price is required"),

  category_name: z.string().min(1, "Category name is required"),
  category_type: z.string().min(1, "Category type is required"),
  colors: z.string().optional(),
  sizes: z.string().optional(),
  image: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function DashboardEditProductForm({
  func,
  styles,
  buttonText,
  product,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function onSubmit(data: FormData) {
    const imageInput = (document.getElementById("image") as HTMLInputElement)
      ?.files?.[0];

    const transformedData = {
      ...data,
      image: imageInput || data.image, // use File if present, else string (for edit)
      colors: data.colors?.split(",").map((c) => c.trim()) ?? [],
      sizes: data.sizes?.split(",").map((s) => s.trim()) ?? [],
    };
    if (!product?.id) {
      console.error("Product ID is missing");
      return;
    }
    await func(product.id.toString(), transformedData);

    reset();
    alert("success");
  }

  const style = styles;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 text-white"
    >
      {/* Title */}
      <div>
        <label htmlFor="title">Title</label>
        <input
          {...register("title")}
          id="title"
          className={style}
          defaultValue={product?.title || ""}
        />
        {errors.title && <p className="text-red-400">{errors.title.message}</p>}
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          {...register("quantity", { valueAsNumber: true })}
          id="quantity"
          className={style}
          defaultValue={product?.quantity || ""}
        />
        {errors.quantity && (
          <p className="text-red-400">{errors.quantity.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          id="price"
          className={style}
          defaultValue={product?.price || ""}
        />
        {errors.price && <p className="text-red-400">{errors.price.message}</p>}
      </div>

      {/* Image */}
      <div>
        <label htmlFor="image">Image URL</label>
        <input
          type="file"
          accept="image/*"
          id="image"
          className={style}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
            }
          }}
        />
      </div>

      {/* Category */}
      <div className="mb-4 flex flex-col gap-6 md:flex-row">
        {/* Category Name */}
        <div className="flex w-full flex-col">
          <label htmlFor="category_name" className="mb-1 font-semibold">
            Category Name
          </label>
          <input
            {...register("category_name")}
            id="category_name"
            className={style}
            defaultValue={product?.category_name || ""}
          />
          {errors.category_name && (
            <p className="mt-1 text-sm text-red-400">
              {errors.category_name.message}
            </p>
          )}
        </div>

        {/* Category Type */}
        <div className="flex w-full flex-col">
          <label htmlFor="category_type" className="mb-1 font-semibold">
            Category Type
          </label>
          <input
            {...register("category_type")}
            id="category_type"
            className={style}
            defaultValue={product?.category_type || ""}
          />
          {errors.category_type && (
            <p className="mt-1 text-sm text-red-400">
              {errors.category_type.message}
            </p>
          )}
        </div>
      </div>

      {/* Colors & sizes */}
      <div className="mb-4 flex flex-col gap-6 md:flex-row">
        {/* Colors */}
        <div className="flex w-full flex-col">
          <label htmlFor="colors" className="mb-1 font-semibold">
            Colors (comma-separated)
          </label>
          <input
            {...register("colors")}
            id="colors"
            className={style}
            defaultValue={product?.colors?.join(", ") || ""}
          />
        </div>

        {/* Sizes */}
        <div className="flex w-full flex-col">
          <label htmlFor="sizes" className="mb-1 font-semibold">
            Sizes (comma-separated)
          </label>
          <input
            {...register("sizes")}
            id="sizes"
            className={style}
            defaultValue={product?.sizes?.join(", ") || ""}
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        {buttonText}
      </button>
    </form>
  );
}

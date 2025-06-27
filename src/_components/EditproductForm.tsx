"use client";

import Model from "./Model";

import { deleteProduct, updateProduct } from "../_lib/actions";
import { useState, useTransition } from "react";
import MiniSpinner from "./MiniSpinner";
import Image from "next/image";
import DashboardEditProductForm from "./DashboardEditProductForm";

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
};

type Props = {
  products: Product[];
};

const itemsPerPage = 3;
export default function EditproductForm({ products }: Props) {
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // For Delete
  function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this product"))
      startTransition(() => deleteProduct(id));
  }
  return (
    <div className="space-y-6 p-6 text-white">
      {paginatedProducts.map((product) => (
        <div
          key={product.id}
          className="flex w-full flex-col gap-4 rounded-xl bg-gray-800 p-5 shadow-md transition-shadow hover:shadow-lg md:flex-row md:items-center md:justify-between"
        >
          {/* Product information */}
          <div className="flex items-center gap-4">
            <Image
              src={product.image}
              alt={product.title}
              width={96} 
              height={96} 
              className="rounded-lg object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-300">
                ${product.price} • {product.quantity} pcs
              </p>
              <p className="text-sm text-gray-400">
                {product.category_name} • {product.type}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-2 flex gap-3 md:mt-0">
            <Model>
              <Model.Open opens={"edit"}>
                <button className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-black transition-colors hover:bg-yellow-600">
                  Edit
                </button>
              </Model.Open>
              <Model.Window name={"edit"}>
                <DashboardEditProductForm
                  func={updateProduct}
                  styles={
                    "w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  }
                  buttonText={"Edit Product"}
                  product={product}
                />
              </Model.Window>
            </Model>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(product.id)}
              className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
            >
              {isPending ? <MiniSpinner /> : "Delete"}
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="rounded bg-gray-700 px-3 py-1 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="rounded bg-gray-700 px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

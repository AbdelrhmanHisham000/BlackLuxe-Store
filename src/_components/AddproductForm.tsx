

"use client";
import { addNewProduct } from "../_lib/actions";
import DashboardAddProductForm from "./DashboardAddProductForm";

export default function AddproductForm() {
  return (
    <DashboardAddProductForm
      func={addNewProduct}
      styles={
        "w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      }
      buttonText={"Add Product"}
     
    />
  );
}

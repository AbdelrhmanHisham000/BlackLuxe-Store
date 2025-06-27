import Filter from "@/src/_components/Filter";
import ProductList from "@/src/_components/ProductList";

import { getAllProducts } from "@/src/_lib/data-service";
import { Suspense } from "react";

interface Product {
  id: number;
  name: string;
  title: string;
  image: string;
  category_type: string;
  category_name: string;
  price: number;
  img: string;
  category: string;
  created_at: string; 
  quantity: number;
}

interface PageProps {
  params: { category: string };
  searchParams: { [key: string]: string | undefined };
}



export async function generateStaticParams() {
  const products = await getAllProducts<Product>();

  const categories = Array.from(
    new Set(
      products
        .map((product) => product.category)
        .filter((c): c is string => typeof c === "string" && c.trim() !== "" && c !== "undefined")
    )
  );


  return categories.map((category) => ({
    category: String(category),
  }));
}




export default async function Page({
  params,
  searchParams,
}: PageProps) {
  const { category } = params;
  const filterCategory = searchParams?.category;

  const products = await getAllProducts<Product>(category);
  const filteredProducts = !filterCategory
    ? products
    : products.filter((prod) => prod.category_name === filterCategory);

  return (
    <div className="flex w-full flex-col p-10 md:flex-row md:items-start md:justify-between">
      <Filter />
      <div className="flex w-full flex-wrap justify-center gap-10 md:justify-end">
        <Suspense
          fallback={
            <div className="flex items-center justify-center text-4xl">
              Loading...
            </div>
          }
        >
          <ProductList products={filteredProducts} />
        </Suspense>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic"; // ⬅️ ADD THIS
import Filter from "@/src/_components/Filter";
import ProductList from "@/src/_components/ProductList";

import { getAllProducts } from "@/src/_lib/data-service";


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




export default async function Page({ params, searchParams }: PageProps) {
  const { category } = params;
  console.log("🏷️ Category param:", category);

  try {
    const products = await getAllProducts<Product>(category);
    console.log(`✅ Fetched ${products.length} products for category "${category}"`);

    if (!products) throw new Error("getAllProducts returned null or undefined");

    const filteredProducts = searchParams.category
      ? products.filter(prod => prod.category_name === searchParams.category)
      : products;

   return (
    <div className="flex w-full flex-col p-10 md:flex-row md:items-start md:justify-between">
      <Filter />
      <div className="flex w-full flex-wrap justify-center gap-10 md:justify-end">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
  } catch (err) {
    console.error("❌ Error in /products/[category]:", err);
    return (
      <div style={{ color: "red", padding: 20 }}>
        Server Error: {(err as Error).message}
      </div>
    );
  }
}


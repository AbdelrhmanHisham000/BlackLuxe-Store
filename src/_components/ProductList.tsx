import ProductCard from "@/src/_components/ProductCard";

interface Product {
  category_type: string;
  category_name: string;
  created_at: string;
  id: number;
  image: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  title: string;
}

type Products = Product[];
export default function ProductList({ products }: { products: Products }) {
  return (
    <div className="flex w-full flex-wrap justify-center gap-10 md:justify-end">
      {products.map((product:Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

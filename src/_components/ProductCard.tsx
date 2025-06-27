"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  title: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  size?: "default" | "small";
}

const ProductCard = function ProductCard({
  product,
  size = "default",
}: ProductCardProps) {
  const params = useParams();
  const { category } = params;

  const isSmall = size === "small";

  return (
    <div
      className={`flex flex-col rounded-2xl bg-black p-${isSmall ? "4" : "6"} text-white shadow-lg transition duration-600 hover:shadow-xl hover:shadow-indigo-500/20 ${
        isSmall ? "h-[250px] w-[180px]" : "h-[415px] w-[280px]"
      }`}
    >
      <p className="text-md text-center text-white">{product.title}</p>
      {/* Image Wrapper */}
      <div className="flex w-full justify-center">
        <div
          className={`relative flex items-center justify-center rounded-xl ${isSmall ? "h-[150px] w-[150px]" : "h-[300px] w-[300px]"}`}
        >
          <div className="relative h-[90%] w-[90%] duration-300 hover:scale-110">
            <Image
              alt={product.title}
              src={product.image}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 270px"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-semibold text-white">{product.price}$</div>
        <Link
          href={`/products/${category}/${product.title}`}
          className="cursor-pointer rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default memo(ProductCard);

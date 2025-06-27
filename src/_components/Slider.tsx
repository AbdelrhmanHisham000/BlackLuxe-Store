"use client";

interface Products {
  id: number;
  title: string;
  name: string;
  img: string;
  price: number;
  image: string;
  category: string;
}

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import ProductCard from "./ProductCard";
export default function Slider({ products }: { products: Products[] }) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 28,
        },
        1536: {
          slidesPerView: 6,
          spaceBetween: 32,
        },
      }}
    >
      {products?.map((product: Products) => (
        <SwiperSlide className="w-full" key={product.id}>
          <div className="flex justify-center">
            <ProductCard size="small" product={product} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

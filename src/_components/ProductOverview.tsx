"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../_redux/cartSlice";
import { useState } from "react";
import { addToWishlist, removeFromWishlist } from "../_redux/wishlistSlice";
import { RootState } from "../_redux/store";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  colors: [];
  sizes: [];
}

export default function ProductOverview({
  theProduct,
  session,
}: {
  theProduct: Product;
  session: { user: { userId: string } };
}) {
  const [color, setColor] = useState("");
  const [sizee, setSizee] = useState("");
  const wishlistState = useSelector((state: RootState) => state.wishlist);
  const favourites =
    wishlistState?.favouritesByUser?.[session?.user.userId] || [];

  const dispatch = useDispatch();
  
  const colors = theProduct.colors;
  const sizes = theProduct.sizes;

  return (
    <div className="m-4 grid grid-cols-1 gap-8 rounded-xl bg-black p-4 md:grid-cols-2">
      {/* Image Section */}
      <div className="relative flex aspect-square w-full items-center justify-center md:aspect-auto md:h-auto">
        <Image
          alt={theProduct.title}
          src={theProduct.image}
          fill
          priority
          className="rounded-xl object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4 px-5 py-8 md:px-10">
        {/* Title + Wishlist */}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold text-white md:text-3xl">
            {theProduct.title}
          </p>
          <button
            onClick={() => {
              const productToAdd = {
                id: theProduct.id,
                title: theProduct.title,
                image: theProduct.image,
                price: theProduct.price,
                userId: session.user.userId,
              };
              const alreadyInWishlist = favourites.some(
                (item) => item.id === theProduct.id,
              );
              if (alreadyInWishlist) {
                dispatch(
                  removeFromWishlist({
                    productId: theProduct.id,
                    userId: session?.user.userId,
                  }),
                );
              } else {
                dispatch(
                  addToWishlist({
                    userId: session?.user.userId,
                    product: productToAdd,
                  }),
                );
              }
              console.log(productToAdd);
            }}
            aria-label="Add to wishlist"
            className="cursor-pointer text-2xl text-white transition hover:text-red-500"
          >
            {favourites.find((item) => item.id === theProduct.id) ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Price */}
        <p className="h-8 w-24 rounded-full bg-blue-500 text-center leading-8 text-white">
          ${theProduct.price} USD
        </p>
        <div className="border-b border-gray-400"></div>

        {/* Colors */}
        <div className="flex flex-col gap-2">
          <p className="p-2 text-lg font-semibold text-white">Color</p>
          <div className="flex flex-wrap gap-2">
            {colors
              ? colors.map((col) => (
                  <Button key={col} state={color} setState={setColor}>
                    {col}
                  </Button>
                ))
              : ""}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-2">
          <p className="p-2 text-lg font-semibold text-white">Sizes</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button key={size} state={sizee} setState={setSizee}>
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Add to Cart Option */}
        <button
          disabled={theProduct.quantity <= 0}
          onClick={() => {
            const productToAdd = {
              id: theProduct.id,
              title: theProduct.title,
              image: theProduct.image,
              price: theProduct.price,
              color,
              size: sizee,
            };

            dispatch(addToCart(productToAdd));
          }}
          className={`mt-6 h-14 w-full rounded-full px-6 text-lg font-semibold text-white transition-all duration-200 md:text-xl ${
            theProduct.quantity <= 0
              ? "cursor-not-allowed bg-gray-400"
              : "cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg hover:from-blue-700 hover:to-blue-600 hover:shadow-xl"
          }`}
        >
          {theProduct.quantity <= 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

function Button({
  children,
  state,
  setState,
}: {
  children: React.ReactNode;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleClick = () => {
    setState(state === String(children) ? "" : String(children));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`h-8 w-16 cursor-pointer rounded-full text-center text-sm leading-8 text-white ${
        state === String(children)
          ? "bg-blue-500 ring-2 ring-blue-500"
          : "bg-[#171717] hover:ring-2 hover:ring-blue-500"
      } transition-colors duration-200 focus:outline-none`}
    >
      {children}
    </button>
  );
}

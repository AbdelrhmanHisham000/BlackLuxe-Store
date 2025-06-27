"use client";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import {
  closeCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../_redux/cartSlice";
import Link from "next/link";
import { RootState } from "../_redux/store";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  category: string;
}

export default function Cart() {
  const { items, isCartOpen } = useSelector((state: RootState) => state.cart );
  const dispatch = useDispatch();
  

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-screen w-[400px] border-l border-gray-100 bg-black p-8 opacity-95 transition-transform ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between text-2xl text-white">
        <p>My Cart</p>
        <button
          onClick={() => dispatch(closeCart())}
          className="cursor-pointer text-3xl text-red-500"
        >
          X
        </button>
      </div>

      {/* Cart Items */}
      <div className="custom-scrollbar mt-10 flex max-h-[calc(100vh-250px)] flex-col gap-6 overflow-auto">
        {items.length === 0 ? (
          <div className="text-center text-white">
            <p>Your cart is empty</p>
          </div>
        ) : (
          items.map((item: CartItem) => <CartItem item={item} key={item.id} />)
        )}
      </div>

      {/* Total Price */}
      {items.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full border-t border-gray-700 bg-black px-8 py-6">
          <div className="flex items-center justify-between text-xl text-white">
            <p>Total:</p>
            <p className="font-semibold">
              {items
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>

          <Link
            href="/checkout"
            onClick={() => dispatch(closeCart())}
            className="mt-4 block w-full rounded-xl bg-white px-4 py-3 text-center text-black transition hover:bg-gray-200"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

function CartItem({ item }: { item: CartItem }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex w-full border-b border-[#e5e7eb] p-2">
        <button
          onClick={() => dispatch(removeFromCart({ id: item.id }))}
          className="flex cursor-pointer items-start text-red-500"
        >
          x
        </button>
        <div className="relative mr-2 h-15 w-15 p-4">
          {item.image ? (
            <Image
              alt="cloth"
              fill
              priority
              quality={100}
              objectFit="cover"
              className="rounded-2xl"
              src={item.image}
            />
          ) : (
            <div className="h-20 w-20 rounded-2xl bg-gray-300" />
          )}
        </div>
        <div className="flex w-full justify-between">
          <p>{item.title}</p>
          <div className="flex w-25 flex-col items-center justify-center gap-2">
            <p>{item.quantity * item.price}</p>

            <Counter productId={item.id} />
          </div>
        </div>
      </div>
    </>
  );
}

function Counter({ productId }: { productId: string }) {
  const dispatch = useDispatch();

  const item = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === productId),
  );
  if (!item) return null; 

  return (
    <div className="flex w-full items-center justify-center gap-4 rounded-4xl border border-[#e5e7eb] text-white">
      <button
        onClick={() => dispatch(decreaseQuantity({ id: productId }))}
        className="text-2xl"
      >
        -
      </button>
      <p>{item.quantity}</p>
      <button
        onClick={() => dispatch(increaseQuantity({ id: productId }))}
        className="text-2xl"
      >
        +
      </button>
    </div>
  );
}

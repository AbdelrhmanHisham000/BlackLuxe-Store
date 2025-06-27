"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_redux/store";
import { IoIosCloseCircle } from "react-icons/io";
import { removeFromWishlist } from "../_redux/wishlistSlice";

interface Favourite {
  id: number;
  title: string;
  image: string;
  price: number;
}

export default function WishlistOverview({
  session,
}: {
  session: { user: { userId: string } };
}) {
  const wishlistState = useSelector((state: RootState) => state.wishlist);

  const dispatch = useDispatch();
  if (!session) {
    return <div className="p-6 text-white">You are not signed in.</div>;
  }
  const favourites: Favourite[] =
    wishlistState?.favouritesByUser?.[session?.user.userId] || [];
  console.log(favourites);
  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-white">All Products</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favourites.map((product) => (
          <div
            key={product.id}
            className="rounded-xl bg-[#111] p-4 shadow transition hover:shadow-lg"
          >
            <button
              onClick={() =>
                dispatch(
                  removeFromWishlist({
                    productId: product.id,
                    userId: session?.user.userId,
                  }),
                )
              }
            >
              <IoIosCloseCircle size={25} className="cursor-pointer" />
            </button>
            <div className="relative mb-4 h-60 w-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="rounded object-contain"
              />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-white">
              {product.title}
            </h2>
            <p className="font-bold text-blue-400">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

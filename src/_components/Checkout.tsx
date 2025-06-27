"use client";

import { useRouter } from "next/navigation";
import { useState, ReactNode, ButtonHTMLAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeOrder, updateProductQuantity } from "../_lib/actions";
import { eraseCart } from "../_redux/cartSlice";
import { RootState } from "../_redux/store";


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


type CardProps = {
  children: ReactNode;
  className?: string;
};

interface User {
  name: string;
  email: string;
  image?: string;
  userId: number;
}
interface Customer {
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  nationality: string;
  needsVisa: boolean;
  email: string;

}

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
function CardContent({ children, className = "" }: CardProps) {
  return <div className={`text-gray-800 ${className}`}>{children}</div>;
}

export default function Checkout({
  customer,
  user,
}: {
  customer: Customer;
  user: User;
}) {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      for (const item of items) {
        await updateProductQuantity(item.id, item.quantity);
        await makeOrder({
          productId: item.id,
          title: item.title,
          color: item.color,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          userId: user.userId,
          orderStatus:'Pending'
        });
      }

      router.push("/orderconfirmation");
      dispatch(eraseCart());
    } catch (err) {
      console.error("Update failed", err);
    }
  };


  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      {/* Cart Summary */}
      <Card>
        <CardContent>
          <h2 className="mb-2 text-xl font-semibold">Cart Summary</h2>
          {items.map((item) => (
            <p key={item.id}>
              {item.title} - {item.quantity} - ${item.price * item.quantity}
            </p>
          ))}

          <p className="mt-2 font-bold">
            Total: $
            {items
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
        </CardContent>
      </Card>

      {/* Shipping Info */}
      <Card>
        <CardContent>
          <h2 className="mb-2 text-xl font-semibold">Shipping Information</h2>
          <p>{customer.fullName}</p>
          <p>
            {customer.streetAddress}
            {customer.apartment ? `, Apt ${customer.apartment}` : ""},<br />
            {customer.city}, {customer.state}, {customer.postalCode}
            <br />
            {customer.country}
          </p>
          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phoneNumber}</p>
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card>
        <CardContent>
          <h2 className="mb-2 text-xl font-semibold">Payment Method</h2>
          <p>Visa ending in 1234</p>
        </CardContent>
      </Card>

      {/* Place Order Button */}
      <div className="text-right">
        <Button
          className="cursor-pointer"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}

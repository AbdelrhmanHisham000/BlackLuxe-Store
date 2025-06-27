'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, ButtonHTMLAttributes } from 'react';



type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
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

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4 ${className}`}>
      {children}
    </div>
  );
}


function CardContent({ children, className = '' }: CardProps) {
  return (
    <div className={`text-gray-800 ${className}`}>
      {children}
    </div>
  );
}

export default function OrderConfirmation() {
  const router = useRouter();



  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Thank you for your order!</h1>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <p>Order #: <span className="font-mono">#123456</span></p>
          <p>Date: April 17, 2025</p>
          <p>Total: $55.00</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Shipping To</h2>
          <p>John Doe</p>
          <p>123 Main Street, NY</p>
        </CardContent>
      </Card>

      <div className="text-right">
        <Button onClick={handleBackToHome}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}

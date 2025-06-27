"use client";
import { Package, ShoppingCart, Users } from "lucide-react"; 

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  
  const isActive = (route: string) => pathname.startsWith(route);

  return (
    <div className="row-start-1 row-end-[-1] flex h-full w-full flex-col bg-[#1F1F1F] p-8 text-gray-200">
     
      <h1 className="mb-12 text-center text-3xl font-semibold text-white">
        Dashboard
      </h1>

      
      <nav className="flex-1">
        <ul className="space-y-4 text-lg">
          <li>
            <Link
              href="/dashboard/products"
              className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                isActive("/dashboard/products") ? "bg-[#2A2A2A]" : ""
              } hover:bg-[#2A2A2A]`}
            >
              <Package className="h-5 w-5 text-gray-400" />
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/orders"
              className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                isActive("/dashboard/orders") ? "bg-[#2A2A2A]" : ""
              } hover:bg-[#2A2A2A]`}
            >
              <ShoppingCart className="h-5 w-5 text-gray-400" />
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/users"
              className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                isActive("/dashboard/users") ? "bg-[#2A2A2A]" : ""
              } hover:bg-[#2A2A2A]`}
            >
              <Users className="h-5 w-5 text-gray-400" />
              Users
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto border-t border-[#2F2F2F] pt-6 text-center text-xs text-gray-500">
        © 2025 Admin Panel
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/dashboard/products/addproduct", label: "Add Product", color: "bg-[#00C49A]" },
  { href: "/dashboard/products/editproduct", label: "Edit Product", color: "bg-[#00C49A]" },
  
];

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop();

  return (
    <div>
      <header className="mb-6">
        <nav>
          <ul className="flex items-center justify-center gap-10 text-white">
            {navItems.map(({ href, label, color }) => {
              const isActive = href.endsWith(lastSegment ?? "");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`rounded-lg px-4 py-2 transition-colors hover:${color} ${
                      isActive ? color : ""
                    } `}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

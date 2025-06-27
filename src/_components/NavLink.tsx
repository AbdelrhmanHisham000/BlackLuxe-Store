"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: string;
  onClick?: () => void; 
}

export default function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick} 
      className={`hover:text-amber-200 duration-300 ${
        isActive ? "text-amber-200" : ""
      }`}
    >
      {children}
    </Link>
  );
}

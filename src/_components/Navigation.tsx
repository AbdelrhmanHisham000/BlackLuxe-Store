

"use client";

import Link from "next/link";
import NavLink from "./NavLink";
import { CiLogin, CiLogout, CiShoppingCart } from "react-icons/ci";
import { FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { Session } from "next-auth";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toogleCart } from "../_redux/cartSlice";
import { useState } from "react";

interface LinksProps {
  session: Session | null;
  onLogout: () => void;
}

export default function Navigation({ session, onLogout }: LinksProps) {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <div className="flex items-center lg:hidden">
        {isMobileMenuOpen ? (
          <FaTimes
            size={26}
            onClick={() => setMobileMenuOpen(false)}
            className="cursor-pointer text-white transition-transform hover:scale-110"
          />
        ) : (
          <FaBars
            size={26}
            onClick={() => setMobileMenuOpen(true)}
            className="cursor-pointer text-white transition-transform hover:scale-110"
          />
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden items-center gap-4 sm:gap-8 md:gap-12 lg:flex lg:gap-20">
        <ul className="flex gap-6 text-base font-medium text-white">
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          {session?.user?.role === "admin" && (
            <NavLink href="/dashboard">Dashboard</NavLink>
          )}
        </ul>

        <div className="flex items-center gap-6 text-xl text-white">
          <Link href="/wishlist" aria-label="Wishlist">
            <FaHeart
              size={22}
              className="cursor-pointer transition-colors hover:text-red-500"
            />
          </Link>

          <CiShoppingCart
            size={26}
            onClick={() => dispatch(toogleCart())}
            className="hover:text-accent cursor-pointer transition-colors"
          />

          {session?.user?.image ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="hover:text-accent flex items-center gap-3 transition-colors"
              >
                <Image
                  className="rounded-full"
                  alt={session.user.name}
                  width={36}
                  height={36}
                  referrerPolicy="no-referrer"
                  src={session.user.image}
                />
                <span className="text-sm font-semibold">
                  {session.user.name}
                </span>
              </Link>
              <CiLogout
                size={26}
                className="cursor-pointer transition-colors hover:text-red-500"
                onClick={onLogout}
              />
            </div>
          ) : (
            <Link href="/login">
              <CiLogin
                size={26}
                className="hover:text-accent cursor-pointer transition-colors"
              />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="bg-opacity-40 fixed inset-0 z-40 bg-[#00000057]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="animate-slide-in fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-white p-6 shadow-lg transition-transform">
            <ul className="flex flex-col gap-6 text-lg font-medium text-gray-800">
              <NavLink href="/products" onClick={() => setMobileMenuOpen(false)}>Products</NavLink>
              <NavLink href="/about" onClick={() => setMobileMenuOpen(false)}>About</NavLink>
              <NavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
              {session?.user?.role === "admin" && (
                <NavLink href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
              )}
            </ul>

            <div className="mt-8 flex flex-col gap-4 border-t pt-6 text-xl text-gray-700">
              <Link href="/wishlist" className="flex items-center gap-3 hover:text-red-500" onClick={() => setMobileMenuOpen(false)}>
                <FaHeart size={24} />
                <span>Wishlist</span>
              </Link>

              <div
                className="hover:text-accent flex cursor-pointer items-center gap-3"
                onClick={() => {
                  dispatch(toogleCart());
                  setMobileMenuOpen(false);
                }}
              >
                <CiShoppingCart size={24} />
                <span>Cart</span>
              </div>

              {session?.user?.image ? (
                <>
                  <Link href="/profile" className="hover:text-accent flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                    <Image
                      className="rounded-full"
                      alt={session.user.name}
                      width={30}
                      height={30}
                      referrerPolicy="no-referrer"
                      src={session.user.image}
                    />
                    <span>{session.user.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-left hover:text-red-500"
                  >
                    <CiLogout size={24} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="hover:text-accent flex items-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiLogin size={24} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

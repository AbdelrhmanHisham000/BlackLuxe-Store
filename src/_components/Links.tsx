"use client";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { eraseCart } from "../_redux/cartSlice";

export default function LinksClient() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const refreshSession = async () => {
    const newSession = await getSession();
    setSession(newSession);
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false }); // avoid full page reload
    await refreshSession(); // update client state
    router.push("/"); // redirect away from protected pages
    dispatch(eraseCart());
  };

  return <Navigation session={session} onLogout={handleLogout} />;
}

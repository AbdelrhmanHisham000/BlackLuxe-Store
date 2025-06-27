
import Link from "next/link";
import { auth } from "../_lib/auth";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  userId?: number | null;
}

interface SessionProps {
  user?: User;
}

export default async function ProfileOverviewInf() {
  const session: SessionProps | null = await auth();

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-bold text-white md:text-2xl">
            Profile Overview
          </h2>
          <p className="text-gray-400">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-bold text-white md:text-2xl">
          Profile Overview
        </h2>
        <div className="mb-8 space-y-4">
          <p className="text-base md:text-lg">
            <strong className="text-purple-400">Username:</strong>{" "}
            <span className="text-gray-300">
              {session.user.name ?? "Not provided"}
            </span>
          </p>
          <p className="text-base md:text-lg">
            <strong className="text-purple-400">Email:</strong>{" "}
            <span className="text-gray-300">
              {session.user.email ?? "Not provided"}
            </span>
          </p>
          <p className="text-base md:text-lg">
            <strong className="text-purple-400">Member Since:</strong>{" "}
            <span className="text-gray-300">January 2025</span>
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <Link
            href="/profile/profileBookings"
            className="rounded bg-purple-600 px-6 py-2 text-center text-white transition hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
          >
            View Bookings
          </Link>
          <Link
            href="/profile/settings"
            className="rounded bg-gray-700 px-6 py-2 text-center text-white transition hover:bg-gray-600"
          >
            Complete Your Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

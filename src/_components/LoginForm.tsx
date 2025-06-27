import Link from "next/link";
import Row from "./Row";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-10">
      {/* Email Input */}

      <Row label="Email" type="email" />

      {/* Password Input */}
      <Row label="Password" type="password" />

      <div className="flex gap-2">
        <p>don&apos;t have an account ?</p>
        <Link href="/signup" className="text-amber-200 hover:underline duration-900">SignUp now</Link>
      </div>
      {/* Login Button */}
      <div className="flex justify-end">
        <button className="h-10 w-32 cursor-pointer border duration-600 hover:bg-white hover:text-black">
          Login
        </button>
      </div>
    </form>
  );
}

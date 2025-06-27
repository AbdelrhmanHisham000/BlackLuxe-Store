import Link from "next/link";
import Row from "./Row";

export default function SignupForm() {
  return (
    <form className="flex flex-col gap-10">
      <Row label="Name" type="name" />
      <Row label="Email" type="email" />
      <Row label="Password" type="password" />

      <div className="flex gap-2">
        <p>have an account ?</p>

        <Link
          href="/login"
          className="text-amber-200 duration-900 hover:underline"
        >
          Login now
        </Link>
      </div>
      {/* Login Button */}
      <div className="flex justify-end">
        <button className="h-10 w-32 cursor-pointer border duration-600 hover:bg-white hover:text-black">
          SignUp
        </button>
      </div>
    </form>
  );
}

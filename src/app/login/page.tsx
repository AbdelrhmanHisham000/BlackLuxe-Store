

import SignInButton from "../../_components/SignInButton";

export const metadata = {
  title: "Login | BlackLuxe",
  description: "Access your account securely. Enter your credentials to log in and manage your dashboard.",
};


export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      <SignInButton />
    </div>
  );
}

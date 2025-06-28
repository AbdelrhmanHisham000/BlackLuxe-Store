import SignInButton from "../../_components/SignInButton";

export const metadata = {
  title: "Login | BlackLuxe",
  description:
    "Access your account securely. Enter your credentials to log in and manage your dashboard.",
};

export default function Page() {
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h2 className="text-center text-3xl font-semibold">
        Sign in to unlock your exclusive BlackLuxe experience
      </h2>

      <SignInButton />
    </div>
  );
}

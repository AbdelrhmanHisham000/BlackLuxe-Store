import Links from "./Links";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-4 sm:px-8 md:px-12 md:py-6 lg:px-20 lg:py-10">
      <Logo />
      <div>
        <Links />
      </div>
    </header>
  );
}

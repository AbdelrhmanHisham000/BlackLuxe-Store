import Link from "next/link";
import { Cinzel_Decorative } from 'next/font/google';

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

export default function Logo() {
  return (
    <Link
      href="/"
      className={`${cinzel.className}  text-4xl tracking-wide font-bold`}
    >
      BlackLuxe
    </Link>
  );
}

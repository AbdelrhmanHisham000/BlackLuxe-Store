import Image from "next/image";
import Link from "next/link";

interface CardProps {
  url: string;
  text: string;
}

export default function Card({ url, text }: CardProps) {
  return (
    <Link
      href={`/products/${text}`}
      className="group relative h-[500px] w-full max-w-[400px] overflow-hidden sm:h-[400px] md:h-[450px] lg:h-[500px]"
    >
      {/* Image */}
      <Image
        src={url}
        alt="Fashion item"
        fill
        priority
        quality={100}
        className="object-cover transition-transform duration-900 group-hover:scale-105"
       
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#0000004d] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-3xl text-white">{text}</span>
      </div>
    </Link>
  );
}

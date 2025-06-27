import AboutInfo from "@/src/_components/AboutInfo";
import Image from "next/image";

export const metadata = {
  title: "About Us | BlackLuxe",
  description: "Learn more about our company.",
};

export default function Page() {
  return (
    <div className="flex flex-col-reverse items-center justify-between gap-10 p-6 md:flex-row md:gap-12 lg:p-12">
      <div className="w-full md:w-1/2">
        <AboutInfo />
      </div>
      <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] aspect-[4/5]">
        <Image
          src="/about.jpg"
          fill
          priority
          quality={100}
          className="rounded-2xl object-cover shadow-lg"
          alt="About our company"
          sizes="(max-width: 768px) 100vw, 420px"
        />
      </div>
    </div>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <Image
          alt="bg"
          src="/bg.jpg" 
          fill
          priority
          quality={100}
          className="object-[40%] object-cover sm:object-center"
        />
      </div>
    </div>
  );
}

import Card from "@/src/_components/Card";

export const metadata = {
  title: "Our Collections | BlackLuxe",
  description:
    "Explore our latest collections for Men, Women, and Children. Discover styles that suit every occasion.",
};
export default function Page() {
  return (
    <div className="pt-10">
      <p className="flex items-center justify-center pb-10 text-4xl">
        Our Collections
      </p>
      <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-3 lg:grid-cols-3 lg:p-10">
        <Card text="Men" url="/about.jpg" />
        <Card text="Children" url="/about.jpg" />
        <Card text="Women" url="/womenn.jpg" />
      </div>
    </div>
  );
}

"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const categories: string[] = ["All", "Bags", "T-shirts", "Drinkware"];

  function handleFilterClick(category: string) {
    const params = new URLSearchParams(searchParams);

    if (category === "All") params.delete("category");
    else params.set("category", category);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-row gap-2 md:flex-col justify-center md:justify-start mb-4 md:mb-0">
      <p className="hidden text-sm text-gray-300 md:flex">Collections</p>
      <div className="flex flex-row gap-2 md:flex-col">
        {categories.map((category) => (
          <button
            key={category}
            className={`flex cursor-pointer justify-start rounded-md px-2 py-1 decoration-blue-500 transition ${
              searchParams.get("category") === category
                ? "text-white underline decoration-blue-500 underline-offset-4"
                : "hover:underline hover:decoration-blue-500 hover:underline-offset-4"
            }`}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

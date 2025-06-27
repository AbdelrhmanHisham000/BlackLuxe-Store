import AddproductForm from "@/src/_components/AddproductForm";
import EditproductForm from "@/src/_components/EditproductForm";
import { getAllProducts } from "@/src/_lib/data-service";
interface PageProps {
  params: { operationtype: string };
}

type Product = {
  id: number;
  created_at: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category_type: string;
  category_name?: string;
  type?: string;
  colors?: string[];
  sizes?: string[];
};

export default async function Page({
  params,
}: {
  params: Promise<PageProps["params"]>;
}) {
  const products = (await getAllProducts()) as Product[];
  const { operationtype } = await params;

  if (operationtype === "addproduct") return <AddproductForm />;
  if (operationtype === "editproduct")
    return <EditproductForm products={products} />;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold capitalize">NOPE</h1>
    </div>
  );
}

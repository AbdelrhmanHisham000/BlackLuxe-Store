

import ProductOverview from "@/src/_components/ProductOverview";
import Slider from "@/src/_components/Slider";
import { auth } from "@/src/_lib/auth";
import { getAllProducts } from "@/src/_lib/data-service";

interface Product {
  id: number;
  title: string;
  name: string;
  img: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  category_type: string;
  colors: [];
  sizes: [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; productName: string }>;
}) {
  const { productName } = await params;
  return { title: `${decodeURIComponent(productName)}` };
}

export async function generateStaticParams() {
  const products = await getAllProducts<Product>();
  const paths = products.map((product) => ({
    category: String(product.category_type),
    productName: encodeURIComponent(product.title),
  }));

  return paths;
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; productName: string }>;
}) {
  const session = await auth();
  const { category, productName } = await params;

  const products = await getAllProducts<Product>(category);

  const theProduct = products?.find(
    (product) =>
      product.title.trim().toLowerCase() ===
      decodeURIComponent(productName).trim().toLowerCase(),
  );

  if (!theProduct) {
    return <div>Product not found</div>;
  }

  // Only pass session info if logged in, otherwise it's undefined
  const sessionForProduct = session
    ? {
        user: {
          userId: String(session.user.userId),
        },
      }
    : undefined;

  return (
    <>
      {/* @ts-ignore */}
      <ProductOverview theProduct={theProduct} session={sessionForProduct} />
      <div className="m-8">
        <Slider products={products} />
      </div>
    </>
  );
}

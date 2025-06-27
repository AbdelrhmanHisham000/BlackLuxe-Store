

import DashboardOrderTables from "@/src/_components/DashboardOrderTables";
import { getOrders } from "@/src/_lib/data-service";
import { format } from "date-fns";

type FormattedOrder = {
  products: {
    image: string;
    name: string;
    size: string;
    color: string;
    quantity: number;
  };
  name: string;
  created_at: string;
  orderStatus: string;
  phoneNumber: string;
  deliveryAddress: string;
  apartment: string;
  city: string;
  state: string;
  country: string;
  email: string;
};

type GroupedOrder = Omit<FormattedOrder, "products"> & {
  products: FormattedOrder["products"][];
};

type Order = {
  image: string;
  title: string;
  size: string;
  color: string;
  quantity: number;
  created_at: string;
  orderStatus: string;
  userId: {
    fullName: string;
    phoneNumber: string;
    streetAddress: string;
    apartment: string;
    city: string;
    state: string;
    country: string;
    email: string;
  };
};
;

export default async function Page() {
const rawOrders = await getOrders();
const Orders: Order[] = rawOrders ? rawOrders : [];


const formattedOrders: FormattedOrder[] = (Orders ?? []).map((Order) => ({
  products: {
    image: Order.image,
    name: Order.title,
    size: Order.size,
    color: Order.color,
    quantity: Order.quantity,
  },
  name: Order.userId.fullName,
  created_at: Order.created_at,
  orderStatus: Order.orderStatus,
  phoneNumber: Order.userId.phoneNumber,
  deliveryAddress: Order.userId.streetAddress,
  apartment: Order.userId.apartment,
  city: Order.userId.city,
  state: Order.userId.state,
  country: Order.userId.country,
  email: Order.userId.email,
}));


  const groupedOrders: Record<string, GroupedOrder> = {};

  formattedOrders.forEach((order) => {
    const timestamp = format(new Date(order.created_at), "yyyy-MM-dd HH:mm:ss");

    if (!groupedOrders[timestamp]) {
      groupedOrders[timestamp] = {
        ...order,
        products: [order.products],
      };
    } else {
      groupedOrders[timestamp].products.push(order.products);
    }
  });

  const mergedOrders = Object.values(groupedOrders);

  return (
    <>
      <h1 className="mb-4 text-4xl font-bold">Orders</h1>
      <DashboardOrderTables orders={mergedOrders} />
    </>
  );
}

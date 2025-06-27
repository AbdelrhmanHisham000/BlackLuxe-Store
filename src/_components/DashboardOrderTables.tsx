import {
  FaLaptop,
  FaUser,
  FaTruck,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaStickyNote,
} from "react-icons/fa";

interface Product {
  color: string;
  image: string;
  name: string;
  quantity: number;
  size: string;
}
interface Orders {
  apartment: string;
  city: string;
  country: string;
  deliveryAddress: string;
  email: string;
  name: string;
  orderStatus: string;
  phoneNumber: string;
  state: string;
  products: Product[];
}

export default function DashboardOrderTables({ orders }: { orders: Orders[] }) {
  return (
    <table className="h-20 text-sm w-full border-collapse border border-gray-400 text-left shadow-md">
      <thead>
        <tr>
          <th className="border border-gray-400 px-6 py-2">
            <div className="flex items-center gap-2">
              <FaLaptop /> Products
            </div>
          </th>
          <th className="border border-gray-400 px-4 py-2">
            <div className="flex items-center gap-2">
              <FaUser /> Name
            </div>
          </th>
          <th className="border border-gray-400 px-4 py-2">
            <div className="flex items-center gap-2">
              <FaTruck /> Order Status
            </div>
          </th>

          <th className="border border-gray-400 px-4 py-2">
            <div className="flex items-center gap-2">
              <FaPhone /> Phone Number
            </div>
          </th>
          <th className="border border-gray-400 px-4 py-2">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt /> Delivery Address
            </div>
          </th>
          <th className="border border-gray-400 px-4 py-2">
            <div className="flex items-center gap-2">
              <FaEnvelope /> Email
            </div>
          </th>
          <th className="border border-gray-400 px-4 py-2">
            <div className="flex items-center gap-2">
              <FaStickyNote /> Notes
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order:Orders, index:number) => (
          <tr key={index}>
            <td className="overflow-x-auto border border-gray-400 px-4 py-2">
              {order.products.map((product, i) => (
                <div key={i}>
                  {product.name} — {product.size} / {product.color} x
                  {product.quantity}
                </div>
              ))}
            </td>
            <td className="border border-gray-400 px-4 py-2">{order.name}</td>
            <td className="border border-gray-400 px-4 py-2 font-medium text-green-600">
              {order.orderStatus}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {order.phoneNumber}
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {order.deliveryAddress}, {order.apartment}, {order.city},{" "}
              {order.state}, {order.country}
            </td>
            <td className="border border-gray-400 px-4 py-2">{order.email}</td>
            <td className="border border-gray-400 px-4 py-2 text-sm text-gray-500">
              {/* Add any notes here if available */}
              N/A
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


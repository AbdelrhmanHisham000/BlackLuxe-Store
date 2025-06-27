import { getAllUsers } from "@/src/_lib/data-service";

export default async function Page() {
  const Users = await getAllUsers();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">All Users</h1>
      <table className="w-full border-collapse border text-left shadow-md">
        <thead>
          <tr>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">City</th>
          </tr>
        </thead>
        <tbody>
          {Users?.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{user.fullName}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phoneNumber}</td>
              <td className="border px-4 py-2">{user.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

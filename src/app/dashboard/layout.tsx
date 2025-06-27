import DashboardHeader from "@/src/_components/DashboardHeader";
import DashboardSidebar from "@/src/_components/DashboardSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-[20rem_1fr] grid-rows-2">
      <DashboardSidebar />
      <DashboardHeader>{children}</DashboardHeader>
    </div>
  );
}

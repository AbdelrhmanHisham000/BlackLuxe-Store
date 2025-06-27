export default function DashboardHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="row-start-1 row-end-[-1] bg-[#2A2A2A] p-10">{children}</div>
  );
}

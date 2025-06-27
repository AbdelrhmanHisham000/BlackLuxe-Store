interface RowProps {
  label: string;
  type: string;
}
export default function Row({ label, type }: RowProps) {
  return (
    <div className="flex flex-col gap-5">
      <label htmlFor="">{label}</label>
      <input type={type} className="border-b focus:outline-none" />
    </div>
  );
}

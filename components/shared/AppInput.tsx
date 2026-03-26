import { Input } from "@/components/ui/input";

export const AppInput = ({ label, error, ...props }: any) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input {...props} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

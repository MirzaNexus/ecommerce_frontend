import { Pencil, Trash2, Package } from "lucide-react";
import { useVariantMutation } from "@/hooks/product/useVariantMutation";

interface VariantTableProps {
  variants: any[];
  productId: string;
  onEdit: (variant: any) => void;
}

export function VariantTable({
  variants,
  productId,
  onEdit,
}: VariantTableProps) {
  const { deleteMutation } = useVariantMutation(productId);

  const handleDelete = (id: string) => {
    if (
      confirm("Bhai, kya aap waqai is variant ko delete karna chahte hain?")
    ) {
      deleteMutation.mutate(id);
    }
  };

  if (!variants || variants.length === 0) {
    return (
      <div className="p-10 text-center flex flex-col items-center gap-2 text-slate-400">
        <Package size={40} strokeWidth={1} />
        <p>No variants found for this product.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-xs uppercase font-black text-slate-500 tracking-wider">
              SKU & Image
            </th>
            <th className="px-6 py-4 text-xs uppercase font-black text-slate-500 tracking-wider">
              Price
            </th>
            <th className="px-6 py-4 text-xs uppercase font-black text-slate-500 tracking-wider">
              Stock
            </th>
            <th className="px-6 py-4 text-xs uppercase font-black text-slate-500 tracking-wider">
              Specs
            </th>
            <th className="px-6 py-4 text-xs uppercase font-black text-slate-500 tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {variants.map((v) => (
            <tr
              key={v.id}
              className="hover:bg-slate-50/80 transition-colors group"
            >
              <td className="px-6 py-4 font-bold text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center border border-slate-200">
                    {v.imageUrl ? (
                      <img
                        src={v.imageUrl}
                        alt={v.sku}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Package size={16} className="text-slate-400" />
                    )}
                  </div>
                  {v.sku}
                </div>
              </td>
              <td className="px-6 py-4 text-slate-600 font-semibold">
                ${v.price}
              </td>
              <td className="px-6 py-4 text-slate-600 font-semibold">
                <span
                  className={`px-2 py-1 rounded-md ${v.stock < 5 ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-700"}`}
                >
                  {v.stock}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1">
                  {v.attributes?.color && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                      {v.attributes.color}
                    </span>
                  )}
                  {v.attributes?.size && (
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase">
                      {v.attributes.size}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(v)}
                    className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 transition-all"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-xl text-slate-600 hover:text-red-600 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

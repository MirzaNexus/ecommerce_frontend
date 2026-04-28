import CategoryRow from "./CategoryRow";
import { CategoryTreeNode } from "@/types/category.types";
import { FolderTree, Info } from "lucide-react";

interface Props {
  data: CategoryTreeNode[];
  onEdit: (node: CategoryTreeNode) => void;
  onDelete: (id: string) => void;
}

export default function CategoryTable({ data, onEdit, onDelete }: Props) {
  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200 m-4">
        <FolderTree size={48} className="text-slate-300 mb-4" />
        <p className="text-slate-500 font-bold">No categories found.</p>
        <p className="text-slate-400 text-xs mt-1">
          Start by adding your first main category.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left bg-slate-50/80 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 first:rounded-tl-[1.5rem]">
              Category Name & Hierarchy
            </th>
            <th className="px-6 py-4 text-right bg-slate-50/80 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 last:rounded-tr-[1.5rem]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {data.map((node) => (
            <CategoryRow
              key={node.id}
              node={node}
              level={0} // Hierarchy tracking ke liye
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

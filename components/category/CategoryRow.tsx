import { Edit2, Trash2, Folder, Subtitles, ChevronRight } from "lucide-react";
import { CategoryTreeNode } from "@/types/category.types";
import { Button } from "@/components/ui/button";

interface Props {
  node: CategoryTreeNode;
  level?: number;
  onEdit: (node: CategoryTreeNode) => void;
  onDelete: (id: string) => void;
}

export default function CategoryRow({
  node,
  level = 0,
  onEdit,
  onDelete,
}: Props) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <>
      <tr className="group hover:bg-slate-50/80 transition-all duration-200">
        <td className="px-6 py-4">
          <div
            className="flex items-center gap-3"
            style={{ paddingLeft: `${level * 24}px` }}
          >
            {/* Visual connector for nested items */}
            {level > 0 && (
              <div className="relative flex items-center">
                <div className="w-4 h-[1px] bg-slate-200" />
                {/* Vertical line connector */}
                <div className="absolute -top-6 left-0 w-[1px] h-10 bg-slate-200" />
              </div>
            )}

            {/* Icon based on level */}
            <div
              className={`
              flex items-center justify-center w-8 h-8 rounded-xl transition-colors
              ${
                level === 0
                  ? "bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100"
                  : "bg-slate-100 text-slate-500"
              }
            `}
            >
              {level === 0 ? <Folder size={14} /> : <Subtitles size={12} />}
            </div>

            <div className="flex flex-col">
              <span
                className={`
                text-sm tracking-tight 
                ${level === 0 ? "font-black text-slate-900" : "font-bold text-slate-600"}
              `}
              >
                {node.name}
              </span>
              {hasChildren && (
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">
                  {node.children.length} Sub-categories
                </span>
              )}
            </div>
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(node)}
              className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <Edit2 size={14} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(node.id)}
              className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </td>
      </tr>

      {/* Recursive Render for children */}
      {hasChildren &&
        node.children.map((child) => (
          <CategoryRow
            key={child.id}
            node={child}
            level={level + 1}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </>
  );
}

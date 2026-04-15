import { CategoryTreeNode } from "@/types/category.types";

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
  return (
    <>
      <tr>
        <td className="p-2">
          <div style={{ paddingLeft: level * 20 }}>{node.name}</div>
        </td>

        <td className="p-2 flex gap-2">
          <button onClick={() => onEdit(node)} className="text-blue-500">
            Edit
          </button>

          <button onClick={() => onDelete(node.id)} className="text-red-500">
            Delete
          </button>
        </td>
      </tr>

      {node.children.map((child) => (
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

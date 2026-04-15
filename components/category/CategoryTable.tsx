import CategoryRow from "./CategoryRow";
import { CategoryTreeNode } from "@/types/category.types";

interface Props {
  data: CategoryTreeNode[];
  onEdit: (node: CategoryTreeNode) => void;
  onDelete: (id: string) => void;
}

export default function CategoryTable({ data, onEdit, onDelete }: Props) {
  if (!data.length) {
    return <p className="text-muted">No categories found.</p>;
  }

  return (
    <table className="w-full border border-border rounded">
      <thead>
        <tr className="bg-muted">
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((node) => (
          <CategoryRow
            key={node.id}
            node={node}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

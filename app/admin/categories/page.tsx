"use client";

import { CreateCategoryInput } from "@/validators/category/category.schema";
import { useState } from "react";
import { useCategoryTree } from "@/hooks/category/useCategories";
import { useCategoryMutations } from "@/hooks/category/useCategoryMutations";
import CategoryTable from "@/components/category/CategoryTable";
import { CategoryTreeNode } from "@/types/category.types";
import CategoryFormModal from "@/components/category/CategoryFormModal";

export default function CategoryPage() {
  const { data, isLoading, isError } = useCategoryTree();
  const { create, update, remove } = useCategoryMutations();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<CategoryTreeNode | null>(null);

  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (node: CategoryTreeNode) => {
    setSelected(node);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this category?")) return;
    remove.mutate(id);
  };

  const handleSubmit = (formData: CreateCategoryInput) => {
    if (selected) {
      update.mutate({
        id: selected.id,
        data: formData,
      });
    } else {
      create.mutate(formData);
    }

    setOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-error">Failed to load</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Categories</h1>

        <button
          onClick={handleCreate}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      <CategoryTable
        data={data || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        initialData={selected}
        tree={data || []}
        isLoading={create.isPending || update.isPending}
      />
    </div>
  );
}

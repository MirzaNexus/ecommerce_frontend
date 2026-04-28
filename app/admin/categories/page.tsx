"use client";

import { CreateCategoryInput } from "@/validators/category/category.schema";
import { useState } from "react";
import { useCategoryTree } from "@/hooks/category/useCategories";
import { useCategoryMutations } from "@/hooks/category/useCategoryMutations";
import CategoryTable from "@/components/category/CategoryTable";
import { CategoryTreeNode } from "@/types/category.types";
import CategoryFormModal from "@/components/category/CategoryFormModal";
import { Button } from "@/components/ui/button";
import {
  ListTree,
  Plus,
  Search,
  RefreshCcw,
  AlertCircle,
  Layers,
} from "lucide-react";

export default function CategoryPage() {
  const { data, isLoading, isError, refetch } = useCategoryTree();
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
    // Note: Standardize confirm with a proper Modal later if possible
    if (
      !confirm(
        "Are you sure? This will remove the category and potentially affect linked products.",
      )
    )
      return;
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

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-20 w-full bg-slate-100 animate-pulse rounded-[2rem]" />
        <div className="h-[500px] w-full bg-slate-50 animate-pulse rounded-[2rem] border border-slate-100" />
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
        <div className="bg-rose-50 p-4 rounded-full mb-4">
          <AlertCircle className="h-8 w-8 text-rose-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Failed to load categories
        </h2>
        <p className="text-slate-500 mt-2 mb-6">
          There was an issue fetching the category tree.
        </p>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="gap-2 rounded-xl"
        >
          <RefreshCcw size={16} /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-[0.2em]">
            <Layers size={16} />
            <span>Catalog Management</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Categories
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Organize your products into a structured hierarchy for better
            navigation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleCreate}
            className="bg-slate-900 text-white hover:bg-indigo-600 px-6 py-6 rounded-2xl font-bold shadow-lg shadow-slate-200 transition-all gap-2"
          >
            <Plus size={20} /> Add New Category
          </Button>
        </div>
      </div>

      {/* --- Main Table Section --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header / Toolbar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ListTree size={18} className="text-slate-400" />
            <span className="text-sm font-bold text-slate-700">
              Category Tree Structure
            </span>
          </div>

          <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200">
            Total: {data?.length || 0} Nodes
          </div>
        </div>

        {/* The Table Component */}
        <div className="p-2">
          <CategoryTable
            data={data || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* --- Form Modal --- */}
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

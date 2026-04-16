"use client";

import { useProducts } from "@/hooks/product/useProducts";
import { useProductFilters } from "@/hooks/product/useProductFilters";

import {
  useToggleProductStatus,
  useArchiveProduct,
  useDeleteProduct,
} from "@/hooks/product/useProductMutations";

import ProductTable from "@/components/product/ProductTable";
import ProductFilters from "@/components/product/ProductFilters";
import ProductPagination from "@/components/product/ProductPagination";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateProduct } from "@/hooks/product/useProductMutations";
import ProductEditForm from "@/components/product/EditProductModal";
import { Product } from "@/types/product.types";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductListPage() {
  const router = useRouter();

  // 1. Data & Filter Hooks
  const { page, limit, search, status, categoryId, updateParams } =
    useProductFilters();

  const { data, isLoading, isPlaceholderData } = useProducts({
    page,
    limit,
    search,
    status,
    categoryId,
  });

  // 2. Mutation Hooks
  const { mutate: toggleStatus } = useToggleProductStatus();
  const { mutate: archiveProduct } = useArchiveProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const handleEditSubmit = (values: any) => {
    if (!selectedProduct) return;

    updateProduct(
      { id: selectedProduct.id, data: values },
      {
        onSuccess: () => {
          toast.success("Product core data updated");
          setSelectedProduct(null); // Close modal
        },
        onError: (err: any) =>
          toast.error(err.response?.data?.message || "Update failed"),
      },
    );
  };

  // 3. Handlers
  const handleToggle = (id: string) => {
    toggleStatus(id, {
      onSuccess: () => toast.success("Product status updated"),
      onError: () => toast.error("Failed to toggle status"),
    });
  };

  const handleArchive = (id: string) => {
    if (confirm("Are you sure you want to archive this product?")) {
      archiveProduct(id, {
        onSuccess: () => toast.success("Product moved to archive"),
        onError: () => toast.error("Failed to archive product"),
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("This action is permanent. Delete product?")) {
      deleteProduct(id, {
        onSuccess: () => toast.success("Product deleted permanently"),
        onError: () => toast.error("Failed to delete product"),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Products
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your inventory, pricing, and product visibility.
          </p>
        </div>
        <Button
          onClick={() => router.push("/admin/products/create")}
          className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      {/* Filters Section */}
      <ProductFilters
        initialSearch={search ?? ""}
        currentStatus={status ?? ""}
        onFilterChange={(newFilters) => updateParams(newFilters)}
      />

      {/* Content Section */}
      <div className="relative">
        {/* Loading Overlay for smooth pagination */}
        {isPlaceholderData && (
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl" />
        )}

        {isLoading && !data ? (
          <div className="h-64 flex items-center justify-center border border-border rounded-xl bg-card">
            <span className="animate-pulse text-muted-foreground font-medium">
              Loading inventory...
            </span>
          </div>
        ) : (
          <>
            <ProductTable
              products={data?.data || []}
              onEdit={(product) => setSelectedProduct(product)} // Pass product to table to enable edit
              onToggleStatus={handleToggle}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />

            {/* Edit Modal */}
            <Dialog
              open={!!selectedProduct}
              onOpenChange={() => setSelectedProduct(null)}
            >
              <DialogContent className="sm:max-w-[600px] bg-card">
                <DialogHeader>
                  <DialogTitle className="text-xl font-heading">
                    Edit Product Core Data
                  </DialogTitle>
                </DialogHeader>

                {selectedProduct && (
                  <ProductEditForm
                    product={selectedProduct}
                    onSubmit={handleEditSubmit}
                    isLoading={isUpdating}
                  />
                )}
              </DialogContent>
            </Dialog>

            {/* ... pagination */}

            <ProductPagination
              currentPage={page}
              totalPages={data?.meta.totalPages || 0}
              onPageChange={(newPage) => updateParams({ page: newPage })}
              isLoading={isPlaceholderData}
            />
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, use } from "react"; // 1. 'use' import karein
import { useProduct } from "@/hooks/product/useProduct";
import { VariantTable } from "@/components/product/VariantTable";
import { VariantFormModal } from "@/components/product/VariantFormModal";
import { Plus, LayoutGrid, DollarSign, Tag, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // 2. Params ko Promise define karein
}) {
  const router = useRouter();

  // 3. params ko 'use' hook ke zariye unwrap karein
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  // Modal State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  // FETCHING VIA OUR CLEAN CUSTOM HOOK
  const { data: product, isLoading, isError } = useProduct(productId);

  // ... rest of your handlers (handleEdit, handleAddNew)

  const handleEdit = (variant: any) => {
    setSelectedVariant(variant);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedVariant(null);
    setIsModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="p-20 text-center animate-pulse font-bold">
        Loading Product Details...
      </div>
    );
  if (isError)
    return (
      <div className="p-20 text-center text-red-500">
        Error: Product not found.
      </div>
    );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Navigation */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Products
      </button>

      {/* --- Section 1: Base Product Card --- */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-indigo-600 font-bold text-xs tracking-widest uppercase">
                Product Overview
              </span>
              <h1 className="text-4xl font-black text-slate-900 leading-tight">
                {product?.name}
              </h1>
            </div>
            <p className="text-slate-500 max-w-2xl leading-relaxed">
              {product?.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                <DollarSign size={20} className="text-emerald-500" />
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">
                    Base Price
                  </p>
                  <p className="font-bold text-slate-800">
                    ${product?.basePrice}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                <Tag size={20} className="text-amber-500" />
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">
                    Slug
                  </p>
                  <p className="font-bold text-slate-800">{product?.slug}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-indigo-600 px-8 py-6 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <LayoutGrid size={40} className="mb-2 opacity-80" />
            <p className="text-sm font-bold opacity-90 uppercase">Variants</p>
            <p className="text-5xl font-black">
              {product?.variants?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* --- Section 2: Variant Management Table --- */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Inventory Variants
            </h2>
            <p className="text-sm text-slate-500">
              Add or manage multiple versions of this product.
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-indigo-600 transition-all font-bold shadow-lg"
          >
            <Plus size={20} /> Add New Variant
          </button>
        </div>

        <VariantTable
          variants={product?.variants || []}
          productId={productId}
          onEdit={handleEdit}
        />
      </div>

      {/* --- Section 3: Shared Modal --- */}
      {isModalOpen && (
        <VariantFormModal
          onClose={() => setIsModalOpen(false)}
          variant={selectedVariant}
          productId={productId}
          productName={product?.name}
        />
      )}
    </div>
  );
}

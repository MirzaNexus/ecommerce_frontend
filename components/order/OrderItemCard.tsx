export function OrderItemCard({ item }: { item: any }) {
  return (
    <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-indigo-100">
      <div className="h-20 w-16 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 shadow-sm">
        <img
          src={item?.productImage || "/placeholder.png"}
          className="h-full w-full object-cover"
          alt={item?.productName || "Product"}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          {/* ✅ ID ki jagah ab ProductName show hoga */}
          <h4 className="text-sm font-bold text-slate-900 line-clamp-1 uppercase tracking-tight">
            {item?.productName || `Product #${item.productVariantId.slice(-8)}`}
          </h4>

          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">
            Quantity: {item.quantity}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <p className="text-xs font-black text-slate-400">
            Unit: ${(Number(item.price || 0) / 100).toFixed(2)}
          </p>
          <p className="text-sm font-black text-slate-900">
            ${((Number(item.price || 0) * item.quantity) / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

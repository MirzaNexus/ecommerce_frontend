export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full animate-pulse">
      {/* Image Area */}
      <div className="aspect-[3/4] w-full bg-slate-200 rounded-[2rem]" />

      {/* Content Area */}
      <div className="px-2 space-y-3">
        {/* Category & Badge */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-slate-200 rounded" />
          <div className="h-5 w-12 bg-slate-100 rounded-full" />
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-slate-200 rounded" />

        {/* Price */}
        <div className="h-5 w-1/3 bg-slate-200 rounded" />
      </div>
    </div>
  );
};

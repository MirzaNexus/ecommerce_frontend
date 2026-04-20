import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Image Gallery Skeleton */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-20 h-24 rounded-lg" />
            ))}
          </div>
          <Skeleton className="flex-1 aspect-[4/5] rounded-[2rem]" />
        </div>

        {/* Right: Info Skeleton */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-12 w-3/4" />
            <div className="flex gap-4 items-center">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-14 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}

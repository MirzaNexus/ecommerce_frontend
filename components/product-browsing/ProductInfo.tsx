export const ProductInfo = ({
  name,
  description,
  price,
  sku,
  category,
}: any) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground">
        {name}
      </h1>
      <div className="flex items-center gap-4">
        <p className="text-3xl font-sans font-medium text-primary">{price}</p>
        <div className="h-4 w-[1px] bg-border" />
        <span className="text-xs text-muted-foreground font-mono uppercase">
          SKU: {sku || "N/A"}
        </span>
      </div>
    </div>
    <div className="prose prose-sm dark:prose-invert">
      <p className="text-muted-foreground leading-relaxed text-lg italic">
        {description}
      </p>
    </div>
  </div>
);

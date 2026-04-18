export const ProductInfo = ({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: string;
}) => (
  <div className="space-y-4">
    <h1 className="text-3xl font-heading font-bold">{name}</h1>
    <p className="text-2xl font-bold text-primary">{price}</p>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

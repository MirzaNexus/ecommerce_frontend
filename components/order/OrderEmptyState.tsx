import Link from "next/link";
import { ShoppingBag } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
}

export const OrderEmptyState = ({
  title,
  description,
  actionText,
  actionHref,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="bg-muted p-6 rounded-full mb-4">
      <ShoppingBag className="w-10 h-10 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground max-w-xs mx-auto mt-2">{description}</p>
    {actionText && actionHref && (
      <Link
        href={actionHref}
        className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
      >
        {actionText}
      </Link>
    )}
  </div>
);

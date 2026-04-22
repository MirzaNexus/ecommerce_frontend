"use client";

import { useCartStore } from "@/store/useCartStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items, updateQuantity, removeItem } = useCartStore();
  const router = useRouter(); // Initialize router

  const handleCheckout = () => {
    onClose(); // Close drawer first
    router.push("/checkout"); // Redirect to checkout page
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md h-full flex flex-col p-0 overflow-hidden">
        <SheetHeader className="p-6 border-b shrink-0">
          {" "}
          {/* 2. shrink-0 prevents header from disappearing */}
          <SheetTitle className="flex items-center gap-2 font-heading">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Shopping Bag ({items.length})
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 w-full min-h-0 px-6">
          <div className="py-6">
            {" "}
            {/* Added internal padding to keep space between items and edges */}
            {items.length > 0 ? (
              items.map((item) => {
                const itemKey = item.variantId || item.productId;
                return (
                  <div key={itemKey} className="flex gap-4 mb-8">
                    {/* Product Image */}
                    <div className="h-28 w-24 rounded-xl overflow-hidden bg-muted border border-border/50 flex-shrink-0 shadow-sm">
                      <img
                        src={item.image}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={item.name}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-sm line-clamp-1 leading-tight">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(itemKey)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Cleaned Attribute Rendering */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.entries(item.attributes).map(
                            ([key, value]) => {
                              // FIX: Skip objects (like dimensions) to prevent React Child error
                              if (typeof value === "object" && value !== null)
                                return null;

                              return (
                                <span
                                  key={key}
                                  className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium uppercase"
                                >
                                  {String(value)}
                                </span>
                              );
                            },
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        {/* Quantity Control */}
                        <div className="flex items-center border rounded-lg h-9 bg-background shadow-sm">
                          <button
                            className="px-3 hover:bg-muted transition-colors rounded-l-lg disabled:opacity-30"
                            onClick={() =>
                              updateQuantity(itemKey, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold w-8 text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 hover:bg-muted transition-colors rounded-r-lg disabled:opacity-30 border-l"
                            onClick={() =>
                              updateQuantity(itemKey, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-sm text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity >= item.stock && (
                            <p className="text-[9px] text-orange-600 font-bold uppercase tracking-tighter">
                              Max Stock
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center opacity-50">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <p>Your bag is empty</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-6 border-t bg-muted/20 shrink-0 space-y-4">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full h-14 rounded-full font-bold shadow-xl"
          >
            Checkout Securely
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

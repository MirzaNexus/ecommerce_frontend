"use client";

import { Product } from "@/types/product.types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // 1. Router import karein
import {
  Edit,
  Trash2,
  Archive,
  Eye,
  EyeOff,
  MoreVertical,
  ImageIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onToggleStatus: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onToggleStatus,
  onArchive,
  onDelete,
}: ProductTableProps) {
  const router = useRouter(); // 2. Initialize router

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/5 rounded-xl border border-dashed border-border">
        <ImageIcon className="h-10 w-10 mb-4 opacity-20" />
        <p className="font-medium">No products found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-muted/50 text-muted-foreground font-semibold border-b border-border">
          <tr>
            <th className="p-4 w-[40%] font-bold uppercase text-[11px] tracking-wider">
              Product
            </th>
            <th className="p-4 font-bold uppercase text-[11px] tracking-wider">
              Category
            </th>
            <th className="p-4 font-bold uppercase text-[11px] tracking-wider">
              Base Price
            </th>
            <th className="p-4 font-bold uppercase text-[11px] tracking-wider">
              Status
            </th>
            <th className="p-4 text-right font-bold uppercase text-[11px] tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product) => (
            <tr
              key={product.id}
              // 3. Row Click Logic
              onClick={() => router.push(`/admin/products/${product.id}`)}
              className="hover:bg-slate-50 transition-all group cursor-pointer"
            >
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200 group-hover:border-indigo-300 transition-colors">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {product.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">
                      {product.slug || "No-Slug"}
                    </span>
                  </div>
                </div>
              </td>

              <td className="p-4">
                <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[11px] font-bold text-slate-600 border border-slate-200">
                  {product.categoryName || "Uncategorized"}
                </span>
              </td>

              <td className="p-4 font-mono font-bold text-slate-700">
                ${product.basePrice.toLocaleString()}
              </td>

              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    product.status === "published"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-amber-50 text-amber-600 border-amber-100"
                  }`}
                >
                  {product.status}
                </span>
              </td>

              <td className="p-4 text-right">
                {/* 4. Important: e.stopPropagation() stops row click from firing */}
                <div
                  className="flex justify-end items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-slate-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-2xl p-2 shadow-xl border-slate-100"
                    >
                      <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 px-3 py-2">
                        Management
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="rounded-xl focus:bg-indigo-50 focus:text-indigo-600 cursor-pointer"
                        onClick={() => onToggleStatus(product.id)}
                      >
                        {product.status === "published" ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" /> Draft
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" /> Publish
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="rounded-xl focus:bg-amber-50 focus:text-amber-600 cursor-pointer text-amber-600"
                        onClick={() => onArchive(product.id)}
                      >
                        <Archive className="mr-2 h-4 w-4" /> Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="rounded-xl focus:bg-rose-50 focus:text-rose-600 cursor-pointer text-rose-600 font-bold"
                        onClick={() => onDelete(product.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// "use client";

// import { Product } from "@/types/product.types";
// import { Button } from "@/components/ui/button";
// import {
//   Edit,
//   Trash2,
//   Archive,
//   Eye,
//   EyeOff,
//   MoreVertical,
//   ImageIcon,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface ProductTableProps {
//   products: Product[];
//   onEdit: (product: Product) => void; // New prop for Edit Modal
//   onToggleStatus: (id: string) => void;
//   onArchive: (id: string) => void;
//   onDelete: (id: string) => void;
// }

// export default function ProductTable({
//   products,
//   onEdit,
//   onToggleStatus,
//   onArchive,
//   onDelete,
// }: ProductTableProps) {
//   if (products.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/5 rounded-xl border border-dashed border-border">
//         <ImageIcon className="h-10 w-10 mb-4 opacity-20" />
//         <p className="font-medium">No products found.</p>
//         <p className="text-xs">
//           Try adjusting your filters or adding a new product.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
//       <table className="w-full text-sm text-left">
//         <thead className="bg-muted/50 text-muted-foreground font-semibold border-b border-border">
//           <tr>
//             <th className="p-4 w-[40%]">Product</th>
//             <th className="p-4">Category</th>
//             <th className="p-4">Base Price</th>
//             <th className="p-4">Status</th>
//             <th className="p-4 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-border">
//           {products.map((product) => (
//             <tr
//               key={product.id}
//               className="hover:bg-muted/20 transition-colors group"
//             >
//               <td className="p-4">
//                 <div className="flex items-center gap-4">
//                   {/* Improved Image Thumbnail */}
//                   <div className="w-14 h-14 rounded-lg bg-muted flex-shrink-0 overflow-hidden border border-border group-hover:border-primary/30 transition-colors">
//                     {product.imageUrl ? (
//                       <img
//                         src={product.imageUrl}
//                         alt={product.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-muted">
//                         <ImageIcon className="h-5 w-5 text-muted-foreground/40" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex flex-col min-w-0">
//                     <span className="font-bold text-foreground truncate max-w-[200px]">
//                       {product.name}
//                     </span>
//                     <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tight truncate">
//                       {product.slug || "No-Slug"}
//                     </span>
//                   </div>
//                 </div>
//               </td>

//               <td className="p-4">
//                 <span className="px-2 py-1 bg-muted rounded text-[11px] font-medium text-muted-foreground">
//                   {product.categoryName || "Uncategorized"}
//                 </span>
//               </td>

//               <td className="p-4 font-mono font-semibold text-foreground">
//                 ${product.basePrice.toLocaleString()}
//               </td>

//               <td className="p-4">
//                 <span
//                   className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${
//                     product.status === "published"
//                       ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
//                       : product.status === "archived"
//                         ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
//                         : "bg-amber-500/10 text-amber-600 border-amber-500/20"
//                   }`}
//                 >
//                   {product.status}
//                 </span>
//               </td>

//               <td className="p-4 text-right">
//                 <div className="flex justify-end items-center gap-1">
//                   {/* Quick Edit Icon */}
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="h-8 w-8 text-muted-foreground hover:text-primary"
//                     onClick={() => onEdit(product)}
//                   >
//                     <Edit className="h-4 w-4" />
//                   </Button>

//                   {/* Context Menu for less frequent actions */}
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-8 w-8">
//                         <MoreVertical className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-48">
//                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                       <DropdownMenuSeparator />

//                       <DropdownMenuItem
//                         onClick={() => onToggleStatus(product.id)}
//                       >
//                         {product.status === "published" ? (
//                           <>
//                             <EyeOff className="mr-2 h-4 w-4" /> Unpublish
//                           </>
//                         ) : (
//                           <>
//                             <Eye className="mr-2 h-4 w-4" /> Publish
//                           </>
//                         )}
//                       </DropdownMenuItem>

//                       <DropdownMenuItem
//                         onClick={() => onArchive(product.id)}
//                         className="text-amber-600 focus:text-amber-600"
//                       >
//                         <Archive className="mr-2 h-4 w-4" /> Archive
//                       </DropdownMenuItem>

//                       <DropdownMenuSeparator />

//                       <DropdownMenuItem
//                         onClick={() => onDelete(product.id)}
//                         className="text-rose-600 focus:text-rose-600 focus:bg-rose-50"
//                       >
//                         <Trash2 className="mr-2 h-4 w-4" /> Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

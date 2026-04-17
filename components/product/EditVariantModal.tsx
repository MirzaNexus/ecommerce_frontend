// // components/admin/variants/VariantFormModal.tsx
// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { variantSchema } from "@/schemas/variant.schema";
// import { useVariantMutation } from "@/hooks/useVariantMutation";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { X } from "lucide-react";
// import FileUpload from "./ImageUpload";

// export function VariantFormModal({ onClose, variant, productId, productName }) {
//   const isEdit = !!variant;
//   const { createMutation, updateMutation } = useVariantMutation(productId);

//   const form = useForm({
//     resolver: zodResolver(variantSchema),
//     defaultValues: variant
//       ? {
//           ...variant,
//           price: Number(variant.price),
//           stock: variant.stock || 0,
//         }
//       : {
//           sku: "",
//           price: 0,
//           stock: 0,
//           image: undefined, // File upload ke liye
//           attributes: { color: "", size: "", material: "", weight: "" },
//         },
//   });

//   const onSubmit = async (values: any) => {
//     if (isEdit) {
//       updateMutation.mutate(
//         { id: variant.id, data: values },
//         { onSuccess: onClose },
//       );
//     } else {
//       createMutation.mutate(values, { onSuccess: onClose });
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
//       <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[95vh]">
//         {/* Header */}
//         <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
//           <div>
//             <h3 className="text-xl font-black text-slate-800 tracking-tight">
//               {isEdit ? "Update Variant" : "Add New Variant"}
//             </h3>
//             <p className="text-xs text-slate-500 font-medium italic">
//               {productName}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Form Body */}
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="p-6 space-y-6 overflow-y-auto"
//           >
//             {/* 📸 INTEGRATING YOUR FILE UPLOAD COMPONENT */}
//             <FormField
//               control={form.control}
//               name="image"
//               render={({ field, fieldState }) => (
//                 <FormItem>
//                   <FormLabel className="text-xs font-bold uppercase text-slate-400 tracking-widest">
//                     Variant Image
//                   </FormLabel>
//                   <FormControl>
//                     <FileUpload
//                       value={field.value}
//                       onChange={field.onChange}
//                       error={fieldState.error?.message}
//                     />
//                   </FormControl>
//                   {/* Note: FileUpload component khud error handle kar raha hai,
//                       isliye FormMessage ki zaroorat nahi agar error prop pass ho raha hai */}
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 name="sku"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[10px] font-black uppercase text-slate-400">
//                       SKU Code
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="E.g. SONY-WH-01"
//                         {...field}
//                         value={field.value || ""}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 name="price"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-[10px] font-black uppercase text-slate-400">
//                       Price ($)
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         {...field}
//                         value={isNaN(field.value) ? "" : field.value}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               name="stock"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-[10px] font-black uppercase text-slate-400">
//                     Initial Inventory
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       {...field}
//                       value={isNaN(field.value) ? "" : field.value}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Attributes Section */}
//             <div className="space-y-4">
//               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b pb-2">
//                 Technical Specs
//               </p>
//               <div className="grid grid-cols-2 gap-4">
//                 <FormField
//                   name="attributes.color"
//                   render={({ field }) => (
//                     <Input
//                       placeholder="Color"
//                       {...field}
//                       value={field.value || ""}
//                     />
//                   )}
//                 />
//                 <FormField
//                   name="attributes.size"
//                   render={({ field }) => (
//                     <Input
//                       placeholder="Size/Version"
//                       {...field}
//                       value={field.value || ""}
//                     />
//                   )}
//                 />
//                 <FormField
//                   name="attributes.material"
//                   render={({ field }) => (
//                     <Input
//                       placeholder="Material"
//                       {...field}
//                       value={field.value || ""}
//                     />
//                   )}
//                 />
//                 <FormField
//                   name="attributes.weight"
//                   render={({ field }) => (
//                     <Input
//                       placeholder="Weight"
//                       {...field}
//                       value={field.value || ""}
//                     />
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="pt-4 flex gap-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 py-3 rounded-2xl font-bold text-slate-500 border border-slate-200 hover:bg-slate-50 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={createMutation.isPending || updateMutation.isPending}
//                 className="flex-[2] bg-slate-900 text-white py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-100 disabled:bg-slate-300"
//               >
//                 {createMutation.isPending || updateMutation.isPending
//                   ? "Syncing..."
//                   : "Save Variant"}
//               </button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { variantService } from "@/services/variantService";
import { toast } from "sonner";

export const useVariantMutation = (productId: string) => {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["product", productId] });

  const createMutation = useMutation({
    mutationFn: (data: any) => variantService.create({ ...data, productId }),
    onSuccess: () => {
      invalidate();
      toast.success("New variant added!");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      variantService.update(id, data),
    onSuccess: () => {
      invalidate();
      toast.success("Variant updated!");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => variantService.delete(id),
    onSuccess: () => {
      invalidate();
      toast.success("Variant deleted");
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};

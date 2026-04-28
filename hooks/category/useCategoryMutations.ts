import { useQueryClient } from "@tanstack/react-query";
import { useMutationHook } from "@/hooks/useMutationHook";
import { categoryService } from "@/services/categoryService";
import { CATEGORY_KEYS } from "./useCategories";
import { deepSanitize } from "@/utils/sanitizer";

import {
  createCategorySchema,
  updateCategorySchema,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/validators/category/category.schema";

export const useCategoryMutations = () => {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: CATEGORY_KEYS.tree,
    });

  const create = useMutationHook<unknown, CreateCategoryInput>(
    async (data) => {
      const sanitized = deepSanitize(data);
      const parsed = createCategorySchema.parse(sanitized);

      const finalPayload = {
        ...parsed,
        parentId: parsed.parentId === null ? undefined : parsed.parentId,
      };

      return categoryService.create(finalPayload);
    },
    {
      onSuccess: invalidate,
    },
  );

  const update = useMutationHook<
    unknown,
    { id: string; data: UpdateCategoryInput }
  >(
    async ({ id, data }) => {
      const sanitized = deepSanitize(data);
      const parsed = updateCategorySchema.parse(sanitized);

      return categoryService.update(id, parsed);
    },
    {
      onSuccess: invalidate,
    },
  );

  const remove = useMutationHook<unknown, string>(
    async (id) => {
      return categoryService.delete(id);
    },
    {
      onSuccess: invalidate,
    },
  );

  return { create, update, remove };
};

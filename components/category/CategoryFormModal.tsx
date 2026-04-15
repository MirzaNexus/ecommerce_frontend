"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateCategoryInput,
  createCategorySchema,
} from "@/validators/category/category.schema";

import { deepSanitize } from "@/utils/sanitizer";
import { CategoryTreeNode } from "@/types/category.types";
import { flattenCategoryTree } from "@/utils/flattenTree";
import { getDescendantIds } from "@/utils/getDescendantIds";

// shadcn/ui
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryInput) => void;
  initialData?: CategoryTreeNode | null;
  tree: CategoryTreeNode[];
  isLoading?: boolean;
}

export default function CategoryFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  tree,
  isLoading,
}: Props) {
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      parentId: undefined,
    },
    mode: "onChange",
  });

  const { reset, handleSubmit, control } = form;

  //Handle edge case where user tries to set parent to a descendant (which would create a cycle)
  const allCategories = flattenCategoryTree(tree);
  let excludedIds: string[] = [];
  if (initialData) {
    const descendantIds = getDescendantIds(initialData);
    excludedIds = [initialData.id, ...descendantIds];
  }

  const flatCategories = allCategories.filter(
    (cat) => !excludedIds.includes(cat.id),
  );

  // Prefill for edit
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        parentId: initialData.parentId ?? undefined,
      });
    } else {
      reset({
        name: "",
        parentId: undefined,
      });
    }
  }, [initialData, reset]);

  const submitHandler = (values: CreateCategoryInput) => {
    const sanitized = deepSanitize(values);
    onSubmit(sanitized);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Fill out the form below to create or update a category.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            {/* NAME */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PARENT SELECT */}
            <FormField
              control={control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value ?? ""}
                      className="w-full border border-border rounded px-3 py-2 bg-background"
                    >
                      <option value="">No Parent</option>
                      {flatCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

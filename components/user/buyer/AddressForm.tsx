"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressFormValues } from "@/validators/address.schema";
import { useCreateAddress, useUpdateAddress } from "@/hooks/user/useAddresses";
import { showSuccess, showError } from "@/components/shared/Apptoast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  initialData?: any;
  onClose?: () => void;
}

export default function AddressForm({ initialData, onClose }: Props) {
  const isEdit = !!initialData;

  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: "shipping",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      isDefault: false,
      ...initialData,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data: AddressFormValues) => {
    if (isEdit) {
      updateAddress.mutate(
        { id: initialData.id, address: data },
        {
          onSuccess: () => {
            showSuccess("Address updated successfully");
            router.push("/user/address");
            if (onClose) onClose();
          },
          onError: () => showError("Failed to update address"),
        },
      );
    } else {
      createAddress.mutate(data, {
        onSuccess: () => {
          showSuccess("Address created successfully");
          router.push("/user/address");
          if (onClose) onClose();
        },
        onError: () => showError("Failed to create address"),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card text-foreground w-full max-w-lg rounded-xl shadow-lg border border-border p-6 space-y-4 max-h-[90vh] overflow-y-auto scrollbar-hide"
      >
        {/* Header */}
        <h2 className="text-xl font-semibold">
          {isEdit ? "Edit Address" : "Add Address"}
        </h2>

        {/* Address Type */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Address Type <span className="text-error">*</span>
          </label>
          <select
            {...register("type")}
            className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Type</option>
            <option value="shipping">Shipping</option>
            <option value="billing">Billing</option>
          </select>
          {errors.type && (
            <p className="text-error text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="text-sm font-medium">
            Address Line 1 <span className="text-error">*</span>
          </label>
          <input
            {...register("line1")}
            className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.line1 && (
            <p className="text-error text-sm mt-1">{errors.line1.message}</p>
          )}
        </div>

        {/* Address Line 2 */}
        <div>
          <label className="text-sm font-medium text-muted">
            Address Line 2 (Optional)
          </label>
          <input
            {...register("line2")}
            className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* City */}
        <div>
          <label className="text-sm font-medium">
            City <span className="text-error">*</span>
          </label>
          <input
            {...register("city")}
            className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.city && (
            <p className="text-error text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="text-sm font-medium text-muted">
            State (Optional)
          </label>
          <input
            {...register("state")}
            className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="text-sm font-medium text-muted">
            Postal Code (Optional)
          </label>
          <input
            {...register("postalCode")}
            className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-sm font-medium">
            Country <span className="text-error">*</span>
          </label>
          <input
            {...register("country")}
            className="w-full px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.country && (
            <p className="text-error text-sm mt-1">{errors.country.message}</p>
          )}
        </div>

        {/* Default Address */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isDefault")} />
          <label className="text-sm">Set as default address</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Link href="/user/address">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-border text-muted-foreground hover:bg-muted/30"
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            disabled={createAddress.isPending || updateAddress.isPending}
            className="px-4 py-2 rounded-md bg-primary text-white hover:opacity-90 disabled:opacity-50"
          >
            {isEdit
              ? updateAddress.isPending
                ? "Updating..."
                : "Update Address"
              : createAddress.isPending
                ? "Creating..."
                : "Save Address"}
          </button>
        </div>
      </form>
    </div>
  );
}

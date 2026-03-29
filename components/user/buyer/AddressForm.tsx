"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressFormValues } from "@/validators/address.schema";
import { useCreateAddress, useUpdateAddress } from "@/hooks/user/useAddresses";
import { showSuccess, showError } from "@/components/shared/Apptoast";

interface Props {
  initialData?: any;
  onClose: () => void;
}

export default function AddressForm({ initialData, onClose }: Props) {
  const isEdit = !!initialData;

  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: AddressFormValues) => {
    if (isEdit) {
      updateAddress.mutate(
        { id: initialData.id, address: data },
        {
          onSuccess: () => {
            showSuccess("Address updated");
            onClose();
          },
          onError: () => showError("Update failed"),
        },
      );
    } else {
      createAddress.mutate(data, {
        onSuccess: () => {
          showSuccess("Address created");
          onClose();
        },
        onError: () => showError("Creation failed"),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded w-full max-w-md space-y-3"
      >
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Address" : "Add Address"}
        </h2>

        <input
          placeholder="Address Line 1"
          {...register("line1")}
          className="input"
        />
        {errors.line1 && <p className="text-red-500">{errors.line1.message}</p>}

        <input placeholder="Line 2" {...register("line2")} className="input" />

        <input placeholder="City" {...register("city")} className="input" />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}

        <input placeholder="State" {...register("state")} className="input" />

        <input
          placeholder="Postal Code"
          {...register("postalCode")}
          className="input"
        />

        <input
          placeholder="Country"
          {...register("country")}
          className="input"
        />
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={createAddress.isPending || updateAddress.isPending}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            {isEdit
              ? updateAddress.isPending
                ? "Updating..."
                : "Update"
              : createAddress.isPending
                ? "Creating..."
                : "Create"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

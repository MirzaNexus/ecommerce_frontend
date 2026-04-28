import React from "react";
import { useFormContext } from "react-hook-form";
import { CheckoutFormValues } from "@/validators/order/order.schema";

interface AddressSelectionProps {
  savedAddresses: any[]; // Replace with your UserAddress type
}

export const AddressSelection: React.FC<AddressSelectionProps> = ({
  savedAddresses,
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();
  const selectedAddressId = watch("userAddressId");

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-heading font-bold">Shipping Address</h3>

      {/* Saved Addresses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedAddresses.map((addr) => (
          <div
            key={addr.id}
            onClick={() => setValue("userAddressId", addr.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition ${
              selectedAddressId === addr.id
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >
            <p className="font-bold">{addr.fullName}</p>
            <p className="text-sm text-muted">
              {addr.line1}, {addr.city}
            </p>
          </div>
        ))}

        {/* Option to use a new address */}
        <div
          onClick={() => setValue("userAddressId", null)}
          className={`p-4 border-2 border-dashed rounded-lg cursor-pointer flex items-center justify-center ${
            !selectedAddressId ? "border-primary bg-primary/5" : "border-border"
          }`}
        >
          <p className="font-medium">+ Use New Address</p>
        </div>
      </div>

      {/* Manual Address Form (Shown only if userAddressId is null) */}
      {!selectedAddressId && (
        <div className="mt-6 p-6 border rounded-xl bg-card space-y-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("addressSnapshot.fullName")}
              placeholder="Full Name"
              className="p-2 border rounded"
            />
            <input
              {...register("addressSnapshot.phone")}
              placeholder="Phone"
              className="p-2 border rounded"
            />
            <input
              {...register("addressSnapshot.line1")}
              placeholder="Address Line 1"
              className="p-2 border rounded"
            />
            <input
              {...register("addressSnapshot.city")}
              placeholder="City"
              className="p-2 border rounded"
            />
            <input
              {...register("addressSnapshot.country")}
              placeholder="Country"
              className="p-2 border rounded"
            />
          </div>
          {errors.addressSnapshot && (
            <p className="text-error text-sm">
              {errors.addressSnapshot.root?.message ||
                "Please fill all required address fields"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

"use client";

import { Address } from "@/types/address";
import {
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/hooks/user/useAddresses";
import { showError, showSuccess } from "@/components/shared/Apptoast";
import { useState } from "react";
import AddressForm from "./AddressForm";

interface Props {
  address: Address;
}

export default function AddressCard({ address }: Props) {
  const setDefault = useSetDefaultAddress();
  const deleteAddress = useDeleteAddress();
  const [editOpen, setEditOpen] = useState(false);

  const handleSetDefault = () => {
    setDefault.mutate(address.id, {
      onSuccess: () => showSuccess("Default updated"),
      onError: () => showError("Failed to set default"),
    });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    deleteAddress.mutate(address.id, {
      onSuccess: () => showSuccess("Deleted successfully"),
      onError: () => showError("Delete failed"),
    });
  };

  return (
    <div className="border p-4 rounded-lg space-y-3">
      <div>
        <p className="font-medium">{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.city}, {address.state}
        </p>
        <p>
          {address.country} - {address.postalCode}
        </p>
      </div>

      {address.isDefault && (
        <span className="text-green-600 text-sm font-medium">
          Default Address
        </span>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleSetDefault}
          disabled={setDefault.isPending || address.isDefault}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {setDefault.isPending ? "Setting..." : "Set Default"}
        </button>

        <button
          onClick={() => setEditOpen(true)}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={deleteAddress.isPending}
          className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
        >
          {deleteAddress.isPending ? "Deleting..." : "Delete"}
        </button>
      </div>

      {editOpen && (
        <AddressForm initialData={address} onClose={() => setEditOpen(false)} />
      )}
    </div>
  );
}

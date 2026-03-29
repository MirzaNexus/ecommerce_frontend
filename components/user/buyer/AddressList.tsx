"use client";

import { useAddresses } from "@/hooks/user/useAddresses";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { useState } from "react";

export default function AddressList() {
  const { data, isLoading, isError } = useAddresses();
  const [open, setOpen] = useState(false);

  if (isLoading) return <div>Loading addresses...</div>;
  if (isError) return <div>Failed to load addresses</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Addresses</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          + Add Address
        </button>
      </div>

      {!data?.length && <div>No addresses found</div>}

      <div className="space-y-3">
        {data?.map((addr) => (
          <AddressCard key={addr.id} address={addr} />
        ))}
      </div>

      {open && <AddressForm onClose={() => setOpen(false)} />}
    </div>
  );
}

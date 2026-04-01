"use client";

import { useState } from "react";
import AddressCard from "@/components/user/buyer/AddressCard";
import AddressForm from "@/components/user/buyer/AddressForm";
import { useAddresses } from "@/hooks/user/useAddresses";

export default function AddressPage() {
  const [openForm, setOpenForm] = useState(false);
  const { data: addresses, isLoading } = useAddresses();

  return (
    <>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-xl font-semibold">My Addresses</h1>

        <button
          onClick={() => setOpenForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          + Add Address
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : addresses?.length === 0 ? (
        <p className="text-muted">No addresses found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses?.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      )}

      {openForm && <AddressForm onClose={() => setOpenForm(false)} />}
    </>
  );
}

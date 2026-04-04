"use client";

import Link from "next/link";
import AddressCard from "@/components/user/buyer/AddressCard";
import { useAddresses } from "@/hooks/user/useAddresses";

export default function AddressPage() {
  const { data: addresses, isLoading } = useAddresses();

  return (
    <>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-xl font-heading font-semibold text-foreground">
          My Addresses
        </h1>

        {/* File-based routing link */}
        <Link
          href="/user/address/add"
          className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity"
        >
          + Add Address
        </Link>
      </div>

      {isLoading ? (
        <p className="text-muted">Loading...</p>
      ) : addresses?.length === 0 ? (
        <p className="text-muted">No addresses found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses?.map((address, index) => (
            <AddressCard
              key={address.id || `address-${index}`}
              address={address}
            />
          ))}
        </div>
      )}
    </>
  );
}

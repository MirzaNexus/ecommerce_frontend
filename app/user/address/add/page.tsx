"use client";

import Link from "next/link";
import AddressForm from "@/components/user/buyer/AddressForm";

export default function AddAddressPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-xl font-heading font-semibold text-foreground">
          Add New Address
        </h1>

        <Link
          href="/user/address"
          className="text-sm text-muted hover:text-primary transition-colors"
        >
          ← Back to Addresses
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* OnClose ki zaroorat nahi kyunke hum URL se control kar rahe hain */}
        <AddressForm />
      </div>
    </>
  );
}

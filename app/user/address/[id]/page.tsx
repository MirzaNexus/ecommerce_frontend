"use client";

import { useParams } from "next/navigation";
import { useAddresses } from "@/hooks/user/useAddresses";
import AddressForm from "@/components/user/buyer/AddressForm";
import Link from "next/link";

export default function EditAddressPage() {
  const params = useParams();
  const { data: addresses, isLoading } = useAddresses();

  if (isLoading) {
    return (
      <div className="p-10 text-center text-muted">
        Loading address details...
      </div>
    );
  }

  const addressToEdit = addresses?.find((addr) => addr.id === params.id);

  if (!addressToEdit) {
    return (
      <div className="p-10 text-center">
        <p className="text-error mb-4">Address not found!</p>
        <Link href="/user/addresses" className="text-primary underline">
          Go back to addresses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <AddressForm initialData={addressToEdit} />
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import Container from "@/components/layout/Container";
// import ProfileView from "@/components/user/buyer/ProfileView";
// import ProfileForm from "@/components/user/buyer/ProfileForm";
// import AddressCard from "@/components/user/buyer/AddressCard";
// import AddressForm from "@/components/user/buyer/AddressForm";
// import { useCurrentUser } from "@/hooks/user/useCurrentUser";
// import { useAddresses } from "@/hooks/user/useAddresses";

// type Tab = "profile" | "address";

// export default function BuyerDashboardPage() {
//   const [activeTab, setActiveTab] = useState<Tab>("profile");
//   const [editProfile, setEditProfile] = useState(false);
//   const [openAddressForm, setOpenAddressForm] = useState(false);

//   const { user, loading } = useCurrentUser();
//   const { data: addresses, isLoading } = useAddresses();

//   if (loading) {
//     return (
//       <main className="min-h-screen flex items-center justify-center">
//         <p className="text-muted">Loading dashboard...</p>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-background py-8">
//       <Container>
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar */}
//           <aside className="w-full md:w-64 bg-card border border-border rounded-xl p-4">
//             <h2 className="text-lg font-semibold mb-4">My Account</h2>

//             <nav className="flex md:flex-col gap-2">
//               <button
//                 onClick={() => {
//                   setActiveTab("profile");
//                   setEditProfile(false);
//                 }}
//                 className={`px-3 py-2 rounded-md text-sm ${
//                   activeTab === "profile"
//                     ? "bg-primary text-white"
//                     : "hover:bg-muted"
//                 }`}
//               >
//                 Profile
//               </button>

//               <button
//                 onClick={() => setActiveTab("address")}
//                 className={`px-3 py-2 rounded-md text-sm ${
//                   activeTab === "address"
//                     ? "bg-primary text-white"
//                     : "hover:bg-muted"
//                 }`}
//               >
//                 Address
//               </button>
//             </nav>
//           </aside>

//           {/* Content */}
//           <section className="flex-1 bg-card border border-border rounded-xl p-6">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6 border-b pb-4">
//               <h1 className="text-xl font-semibold">
//                 {activeTab === "profile" ? "My Profile" : "My Addresses"}
//               </h1>

//               {/* Profile Button */}
//               {activeTab === "profile" && (
//                 <button
//                   onClick={() => setEditProfile(!editProfile)}
//                   className="px-4 py-2 bg-primary text-white rounded-md"
//                 >
//                   {editProfile ? "Cancel" : "Edit Profile"}
//                 </button>
//               )}

//               {/* Address Button */}
//               {activeTab === "address" && (
//                 <button
//                   onClick={() => setOpenAddressForm(true)}
//                   className="px-4 py-2 bg-primary text-white rounded-md"
//                 >
//                   + Add Address
//                 </button>
//               )}
//             </div>

//             {/* ===== PROFILE ===== */}
//             {activeTab === "profile" && user && (
//               <>
//                 {!editProfile && <ProfileView />}

//                 {editProfile && (
//                   <ProfileForm
//                     initialData={{
//                       firstName: user.firstName,
//                       lastName: user.lastName,
//                       phone: user.phone,
//                       avatarUrl: user.avatarUrl,
//                     }}
//                   />
//                 )}
//               </>
//             )}

//             {/* ===== ADDRESS ===== */}
//             {activeTab === "address" && (
//               <>
//                 {isLoading ? (
//                   <p>Loading addresses...</p>
//                 ) : addresses?.length === 0 ? (
//                   <p className="text-muted">No addresses found</p>
//                 ) : (
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {addresses?.map((address) => (
//                       <AddressCard key={address.id} address={address} />
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </section>
//         </div>

//         {/* 🔥 GLOBAL ADDRESS FORM MODAL */}
//         {openAddressForm && (
//           <AddressForm onClose={() => setOpenAddressForm(false)} />
//         )}
//       </Container>
//     </main>
//   );
// }

export default function UserDashboardPage() {
  return (
    <>
      <h1 className="text-xl font-semibold mb-4">User Dashboard</h1>
      <p className="text-muted">Welcome to your dashboard</p>
    </>
  );
}

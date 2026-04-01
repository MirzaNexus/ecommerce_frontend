import { ReactNode } from "react";
import RegisterForm from "@/components/user/buyer/RegisterForm";
import Container from "@/components/layout/Container";
import DesktopNav from "@/components/layout/DesktopNav";

import Link from "next/link";

export default function RegistrationPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Content */}
      <section className="flex-1 flex items-center justify-center py-12">
        <Container>
          <div className="max-w-md w-full bg-card border border-border rounded-lg p-8 shadow-sm">
            {/* Optional subheader / instruction */}
            <h2 className="text-lg font-medium text-foreground mb-4">
              Sign up to start your journey
            </h2>

            {/* Registration Form */}
            <RegisterForm />
          </div>
        </Container>
      </section>
    </main>
  );
}

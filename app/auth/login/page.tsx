import Container from "@/components/layout/Container";
import { LoginForm } from "@/components/user/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-start justify-center">
      <Container>
        <section className="w-full flex flex-col items-center justify-center py-12">
          {/* Header */}
          <header className="text-center mb-2">
            <h1 className="text-3xl font-heading font-semibold">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Login to your account to continue
            </p>
          </header>

          {/* Content */}
          <div className="w-full flex justify-center">
            <LoginForm />
          </div>
        </section>
      </Container>
    </main>
  );
}

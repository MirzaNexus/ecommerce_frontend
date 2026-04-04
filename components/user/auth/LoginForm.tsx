"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/loginSchema";
import { useLogin } from "@/hooks/auth/useLogin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDeviceId } from "@/utils/deviceId";
import { useState, useEffect } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useLogin();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    let deviceId = "";
    if (typeof window !== "undefined") {
      deviceId = getDeviceId() || "unknown_device";
    }

    const payload = {
      ...data,
      deviceId,
    };

    mutate(payload, {
      onSuccess: (response: any) => {
        toast.success("Login successful! Redirecting...");

        // 3. Role-based Redirect (Middleware sync fix)
        // router.push ke sath refresh zaroori hai taake middleware cookies utha sakay
        const userRole = response?.user?.role || "buyer";

        if (userRole === "admin") {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/");
        }
        router.refresh();
      },
      onError: (error: any) => {
        const errorMsg =
          error?.response?.data?.message || "Login failed. Please try again.";
        toast.error(errorMsg);
      },
    });
  };

  if (!isMounted) return null; // Avoids server/client mismatch crash

  return (
    <Card className="w-full max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

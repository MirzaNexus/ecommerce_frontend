"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SubscribeInput,
  SubscribeSchema,
} from "@/validators/newsletter/newsletter.schema";

import { useNewsletter } from "@/hooks/newsletter/useNewsletter";
import { useFcmToken } from "@/hooks/newsletter/useFcmToken";
import { Loader2 } from "lucide-react";

export function NewsletterForm() {
  // 1. Get FCM Token (Auto-requests permission on mount)
  const { fcmToken } = useFcmToken();
  const { subscribe, isSubscribing } = useNewsletter();

  // 2. Form Setup with Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscribeInput>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: SubscribeInput) => {
    // 🟢 Injecting Token into subscription data
    subscribe({
      ...data,
      fcmToken: fcmToken || undefined,
    });
    reset();
  };

  return (
    <section
      id="newsletter-section"
      className="my-12 bg-indigo-600 rounded-[2rem] p-12 relative overflow-hidden shadow-2xl shadow-indigo-200"
    >
      <div className="relative z-10 text-center">
        <h3 className="text-white text-3xl font-black uppercase italic tracking-tighter mb-2">
          Get Your First Order
        </h3>
        <p className="text-indigo-100 mb-8 font-medium max-w-sm mx-auto opacity-90">
          Join the Clothify squad and stay ahead of the trends.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex flex-col items-start gap-1">
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className={`w-full h-12 bg-white/10 border ${
                  errors.email ? "border-red-400" : "border-white/20"
                } rounded-xl px-4 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all`}
              />
              {errors.email && (
                <p className="text-red-300 text-[10px] font-bold uppercase mt-1 ml-2 tracking-widest">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubscribing}
              className="bg-white text-indigo-600 h-12 px-8 rounded-xl font-black uppercase italic text-xs hover:bg-indigo-50 transition-transform active:scale-95 flex items-center justify-center min-w-[140px] shadow-lg"
            >
              {isSubscribing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Join the Squad"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Abstract Circles for Design Aesthetics */}
      <div className="absolute -top-24 -right-24 h-64 w-64 bg-indigo-500 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-indigo-700 rounded-full blur-3xl opacity-50 pointer-events-none" />
    </section>
  );
}

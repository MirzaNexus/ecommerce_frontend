"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BroadcastSchema,
  BroadcastInput,
} from "@/validators/newsletter/newsletter.schema";
import { useNewsletter } from "@/hooks/newsletter/useNewsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Megaphone, Image as ImageIcon, Send } from "lucide-react";

export const AdminBroadcastCenter = () => {
  const { broadcast, isBroadcasting } = useNewsletter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BroadcastInput>({
    resolver: zodResolver(BroadcastSchema),
  });

  const onSubmit = (data: BroadcastInput) => {
    broadcast(data);
    reset();
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 max-w-2xl mx-auto shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
          <Megaphone className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter">
            Campaign Center
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            Send Push Notifications
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Subject Title
          </label>
          <Input
            {...register("title")}
            placeholder="New Summer Collection!"
            className="rounded-xl border-slate-200 h-12"
          />
          {errors.title && (
            <p className="text-red-500 text-[10px]">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Message Content
          </label>
          <Textarea
            {...register("body")}
            placeholder="Checkout our latest trends..."
            className="rounded-xl border-slate-200 min-h-[120px]"
          />
          {errors.body && (
            <p className="text-red-500 text-[10px]">{errors.body.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Banner Image URL
          </label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              {...register("imageUrl")}
              placeholder="https://res.cloudinary.com/..."
              className="rounded-xl border-slate-200 h-12 pl-10"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isBroadcasting}
          className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase italic tracking-widest shadow-lg shadow-indigo-100"
        >
          {isBroadcasting ? (
            "Processing..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Blast Campaign
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

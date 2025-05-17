"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const reminderSchema = z.object({
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
});

export type ReminderFormData = z.infer<typeof reminderSchema>;

export function useReminderForm() {
  return useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      description: "",
    },
  });
}

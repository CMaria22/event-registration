import { z } from "zod";

export const newRegistrationSchema = z.object({
  id_event: z.string().nonempty("Event ID is required"),
  id_user: z.string().nonempty("User ID is required"),
  event_name: z.string().nonempty("Event name is required"),
  date: z.string().nonempty("Date is required"),
});

export type NewRegistration = z.infer<typeof newRegistrationSchema>;

export const successResponse = <T extends z.ZodTypeAny>(data: T) =>
  z.object({ data, status: z.number() , isSuccess: z.literal(true)});

export const errorResponseSchema = z.object({
  error: z.string(),
  status: z.number(),
  fields: z.array(z.string()).optional(),
  isSuccess: z.literal(false)
});

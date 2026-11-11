import { z } from "zod";
import { errorResponseSchema, successResponse } from "./api";

export const RegistrationSchema = z.object({
  id: z.string(),
  id_event: z.string().nonempty("Event ID is required"),
  id_user: z.string().nonempty("User ID is required"),
  event_name: z.string().nonempty("Event name is required"),
  date: z.string().nonempty("Date is required"),
});

export type Registration = z.infer<typeof RegistrationSchema>;

export const RegistrationsResponseSchema = z.union([
  successResponse(RegistrationSchema.array()),
  errorResponseSchema,
]);
export const CreateRegistrationResponseSchema = z.union([
  successResponse(RegistrationSchema),
  errorResponseSchema,
]);

export const DeleteRegistrationDataSchema = z.object({ id: z.string() });

export type DeleteResponse = z.infer<typeof DeleteRegistrationDataSchema>;

export const DeleteRegistrationResponseSchema = z.union([
  successResponse(DeleteRegistrationDataSchema),
  errorResponseSchema,
]);
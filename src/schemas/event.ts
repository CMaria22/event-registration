import { z } from "zod";
import { errorResponseSchema, successResponse } from "./api";

export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(["Workshop", "Conference", "Meetup"]),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string(),
  availability: z.enum(["limited", "unlimited", "unspecified"]),
  availableSeats: z.number().optional(),
  fee: z.number(),
});

export type Event = z.infer<typeof EventSchema>;

export const EventsResponseSchema = z.union([
  successResponse(EventSchema.array()),
  errorResponseSchema,
]);

export const EventResponseSchema = z.union([
  successResponse(EventSchema),
  errorResponseSchema,
]);
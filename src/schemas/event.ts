import { z } from "zod";
import { errorResponseSchema, successResponse } from "./api";


export const AvailabilitySchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("limited"),
    remaining: z.number().int().nonnegative(),
  }),
  z.object({ kind: z.literal("unlimited") }),
  z.object({ kind: z.literal("unknown") }),
]);

export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(["Workshop", "Conference", "Meetup"]),
  date: z.iso.date(),
  startTime: z.string(),
  location: z.string(),
  availability: AvailabilitySchema,
  fee: z.number(),
});

export type Availability = z.infer<typeof AvailabilitySchema>;
export type Event = z.infer<typeof EventSchema>;

export const EventsResponseSchema = z.union([
  successResponse(EventSchema.array()),
  errorResponseSchema,
]);

export const EventResponseSchema = z.union([
  successResponse(EventSchema),
  errorResponseSchema,
]);

export type EventFilterValues = {
  query: string;
  category: string;
  date: string;
};
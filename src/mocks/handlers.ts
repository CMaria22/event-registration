import { http, HttpResponse } from "msw";
const events = [
  {
    id: "abc-123",
    name: "Arts & Crafts Workshop",
    description:
      "Learn the basics of arts and crafts with our expert instructor.",
  },
  {
    id: "def-456",
    name: "Tech Conference 2023",
    description:
      "Join us for the annual tech conference featuring industry leaders and innovators.",
  },
];
type Registration = {
  id: string;
  event_name: string;
  id_event: string;
  id_user: string;
  date: string;
};
const registrations: Registration[] = [
  {
    id: "reg-1",
    event_name: "Arts & Crafts Workshop",
    id_event: "abc-123",
    id_user: "my-user-id",
    date: "2023-01-01",
  },
  {
    id: "reg-2",
    event_name: "Tech Conference 2023",
    id_event: "def-456",
    id_user: "my-user-id",
    date: "2023-02-01",
  },
];

type NewRegistration = Omit<Registration, "id">;

const requiredFields: (keyof NewRegistration)[] = [
  "event_name",
  "id_event",
  "id_user",
  "date",
];

export const handlers = [
  http.get("https://api.example.com/events", () => {
    return HttpResponse.json(events);
  }),
  http.get("https://api.example.com/events/:id", ({ params }) => {
    const { id } = params;
    const event = events.find((e) => e.id === id);
    if (!event) {
      return HttpResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return HttpResponse.json(event);
  }),
  http.get("https://api.example.com/my-registrations", () => {
    return HttpResponse.json(registrations);
  }),
  http.post("https://api.example.com/registrations", async ({ request }) => {
    const body = (await request.json()) as Partial<NewRegistration>;
    const missing = requiredFields.filter(
      (field) => typeof body?.[field] !== "string" || !body[field],
    );

    if (missing.length > 0) {
      return HttpResponse.json(
        { error: "Missing or invalid fields", fields: missing },
        { status: 400 },
      );
    }

    const data = body as NewRegistration;
    const alreadyExists = registrations.some(
      (r) => r.id_event === data.id_event && r.id_user === data.id_user,
    );

    if (alreadyExists) {
      return HttpResponse.json(
        { error: "User already registered for this event" },
        { status: 409 },
      );
    }
    const newRegistration: Registration = {
      id: `reg-${registrations.length + 1}`,
      ...data,
    };
    registrations.push(newRegistration);
    return HttpResponse.json(newRegistration, { status: 201 });
  }),
  http.delete("https://api.example.com/registrations/:id", ({ params }) => {
    const { id } = params;
    const index = registrations.findIndex((r) => r.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: "Registration not found" }, { status: 404});
    }
    registrations.splice(index, 1);
    return HttpResponse.json({ message: "Registration deleted" }, { status: 200 });
  }),
];

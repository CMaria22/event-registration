import { http, HttpResponse } from "msw";
import { events,  Registration,  registrations } from "./fixtures";
import { NewRegistration, newRegistrationSchema } from "@/schemas/api";



export const handlers = [
  http.get("https://api.example.com/events", () => {
    return HttpResponse.json({ data: events , status: 200, isSuccess: true });
  }),
  http.get("https://api.example.com/events/:id", ({ params }) => {
    const { id } = params;
    const event = events.find((e) => e.id === id);
    if (!event) {
      return HttpResponse.json({ error: "Event not found" , status: 404, isSuccess: false });
    }
    return HttpResponse.json({ data: event, status: 200, isSuccess: true });
  }),
  http.get("https://api.example.com/my-registrations/:id", ({ params }) => {
    const { id } = params;
    const my_registration: Registration[] = registrations.filter((r) => r.id_user === id);
    if (my_registration.length === 0) {
      return HttpResponse.json({ error: "Registration not found" , status: 404, isSuccess: false });
    }
    return HttpResponse.json({ data: my_registration, status: 200, isSuccess: true });
  }),
  http.post("https://api.example.com/registrations", async ({ request }) => {
    const body = (await request.json()) as Partial<NewRegistration>;
    const validationResult = newRegistrationSchema.safeParse(body);

    if (!validationResult.success) {
      return HttpResponse.json(
        { error: "Invalid registration data", fields: validationResult.error.issues.map((i) => i.path.join(".")) , status: 400, isSuccess: false },
      );
    }

    const data = body as NewRegistration;
    const alreadyExists = registrations.some(
      (r) => r.id_event === data.id_event && r.id_user === data.id_user,
    );

    if (alreadyExists) {
      return HttpResponse.json(
        { error: "User already registered for this event" , status: 409, isSuccess: false },
      );
    }
    const newRegistration: Registration = {
      id: `reg-${registrations.length + 1}`,
      ...data,
    };
    registrations.push(newRegistration);
    return HttpResponse.json({ data: newRegistration, status: 201, isSuccess: true });
  }),
  http.delete("https://api.example.com/registrations/:id", ({ params }) => {
    const { id } = params;
    const index = registrations.findIndex((r) => r.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: "Registration not found",status: 404, isSuccess: false });
    }
    registrations.splice(index, 1);
    return HttpResponse.json({ data: {id} , status: 200, isSuccess: true});
  }),
];

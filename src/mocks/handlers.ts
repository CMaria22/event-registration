import { http, HttpResponse } from "msw/http";
import { events, Registration, registrations } from "./fixtures";
import { NewRegistration, newRegistrationSchema } from "@/schemas/api";

export const handlers = [
  http.get("https://api.example.com/events", ({ request }) => {
    const url = new URL(request.url);
    const query = (url.searchParams.get("query") ?? "").toLowerCase();
    const category = url.searchParams.get("category") ?? "all";
    const date = url.searchParams.get("date") ?? "anytime";

    const todayStr = new Date().toLocaleDateString("sv-SE");

    const filtered = events.filter((e) => {
      const matchesQuery = e.name.toLowerCase().includes(query);
      const matchesCategory = category === "all" || e.type.toLowerCase() === category;
      const matchesDate =
        date === "anytime" ||
        (date === "today" && e.date === todayStr) ||
        (date === "month" && e.date.startsWith(todayStr.slice(0, 7))) ||
        (date === "year" && e.date.startsWith(todayStr.slice(0, 4)));
      return matchesQuery && matchesCategory && matchesDate;
    });

    return HttpResponse.json(
      { data: filtered, status: 200, isSuccess: true },
      { status: 200 },
    );
  }),
  http.get("https://api.example.com/events/:id", ({ params }) => {
    const { id } = params;
    const event = events.find((e) => e.id === id);
    if (!event) {
      return HttpResponse.json(
        {
          error: "Event not found",
          status: 404,
          isSuccess: false,
        },
        { status: 404 },
      );
    }
    return HttpResponse.json(
      { data: event, status: 200, isSuccess: true },
      { status: 200 },
    );
  }),

  http.get("https://api.example.com/registrations/:id", ({ params }) => {
    const { id } = params;
    const my_registration: Registration[] = registrations.filter(
      (r) => r.id_user === id,
    );
    if (my_registration.length === 0) {
      return HttpResponse.json(
        {
          error: "Registration not found",
          status: 404,
          isSuccess: false,
        },
        { status: 404 },
      );
    }
    return HttpResponse.json(
      {
        data: my_registration,
        status: 200,
        isSuccess: true,
      },
      { status: 200 },
    );
  }),
  http.post("https://api.example.com/registrations", async ({ request }) => {
    const body = (await request.json()) as Partial<NewRegistration>;
    const validationResult = newRegistrationSchema.safeParse(body);

    if (!validationResult.success) {
      return HttpResponse.json(
        {
          error: "Invalid registration data",
          fields: validationResult.error.issues.map((i) => i.path.join(".")),
          status: 400,
          isSuccess: false,
        },
        { status: 400 },
      );
    }

    const data = body as NewRegistration;
    const alreadyExists = registrations.some(
      (r) => r.id_event === data.id_event && r.id_user === data.id_user,
    );

    if (alreadyExists) {
      return HttpResponse.json(
        {
          error: "User already registered for this event",
          status: 409,
          isSuccess: false,
        },
        { status: 409 },
      );
    }
    const newRegistration: Registration = {
      id: `reg-${registrations.length + 1}`,
      ...data,
    };
    registrations.push(newRegistration);
    return HttpResponse.json(
      {
        data: newRegistration,
        status: 201,
        isSuccess: true,
      },
      { status: 201 },
    );
  }),
  http.delete("https://api.example.com/registrations/:id", ({ params }) => {
    const { id } = params;
    const index = registrations.findIndex((r) => r.id === id);
    if (index === -1) {
      return HttpResponse.json(
        {
          error: "Registration not found",
          status: 404,
          isSuccess: false,
        },
        { status: 404 },
      );
    }
    registrations.splice(index, 1);
    return HttpResponse.json(
      { data: { id }, status: 200, isSuccess: true },
      { status: 200 },
    );
  }),
];

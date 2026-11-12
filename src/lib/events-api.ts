import {  EventResponseSchema, EventsResponseSchema, type Event } from "@/schemas/event";
import { CreateRegistrationResponseSchema, DeleteRegistrationResponseSchema, DeleteResponse, Registration, RegistrationsResponseSchema } from "@/schemas/registration";

export async function getEvents(): Promise<Event[]> {
  const response = await fetch("https://api.example.com/events");
  const json = await response.json();
  const parsed = EventsResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error(`Invalid response format (${response.status})`);
  }

  if ( parsed.data.isSuccess === false) {
    throw new Error(`${parsed.data.error} (${parsed.data.status})`);
  }

  return parsed.data.data;
}


export async function getEventById(id: string): Promise<Event> {
  const response = await fetch(`https://api.example.com/events/${id}`);
  const json = await response.json();
  const parsed = EventResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error(`Invalid response format (${response.status})`);
  }

  if (parsed.data.isSuccess === false) {
    throw new Error(`${parsed.data.error} (${parsed.data.status})`);
  }

  return parsed.data.data;
}



export async function getMyRegistrations(user_id: string): Promise<Registration[]> {
  const response = await fetch(`https://api.example.com/registrations/${user_id}`);
  const json = await response.json();
  const parsed = RegistrationsResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error(`Invalid response format (${response.status})`);
  }

  if (parsed.data.isSuccess === false) {
    throw new Error(`${parsed.data.error} (${parsed.data.status})`);
  }

  return parsed.data.data;
}

export async function createRegistration(registration: { id_event: string; id_user: string; event_name: string; date: string }): Promise<void> {
  const response = await fetch("https://api.example.com/registrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registration),
  });
  
  const json = await response.json();
  const parsed = CreateRegistrationResponseSchema.safeParse(json);
    if (!parsed.success) {
    throw new Error(`Invalid response format (${response.status})`);
    }
    if(parsed.data.isSuccess === false) {
    throw new Error(`${parsed.data.error} (${parsed.data.status})`);
    }
}

export async function deleteRegistration(id:string) : Promise<DeleteResponse> {
    const response = await fetch(`https://api.example.com/registrations/${id}`, {
        method: "DELETE",
    });
    const json = await response.json();
    const parsed = DeleteRegistrationResponseSchema.safeParse(json);
    if( !parsed.success) {
        throw new Error(`Invalid response format (${response.status})`);
    }
    if( parsed.data.isSuccess === false) {
        throw new Error(`${parsed.data.error} (${parsed.data.status})`);
    }
    return parsed.data.data;
}
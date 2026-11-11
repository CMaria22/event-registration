import { Event } from "@/schemas/event";
export type EventAvailability = "limited" | "unlimited" | "unspecified";


export const events: Event[] = [
  {
    id: "evt-001",
    name: "Product Design Sprint",
    description: "Build better products through a hands-on design sprint.",
    type: "Workshop",
    date: "2027-01-04",
    startTime: "09:00",
    endTime: "12:00",
    location: "Bucharest",
    availability: "limited",
    availableSeats: 5,
    fee: 0,
  },
  {
    id: "evt-002",
    name: "React Patterns Lab",
    description: "Explore modern React patterns in a practical lab session.",
    type: "Workshop",
    date: "2027-01-12",
    startTime: "09:00",
    endTime: "12:00",
    location: "Online",
    availability: "unlimited",
    fee: 0,
  },
  {
    id: "evt-003",
    name: "Design Systems 101",
    description: "An introduction to building and maintaining design systems.",
    type: "Workshop",
    date: "2027-01-18",
    startTime: "09:00",
    endTime: "12:00",
    location: "Cluj-Napoca",
    availability: "limited",
    availableSeats: 0,
    fee: 0,
  },
  {
    id: "evt-004",
    name: "Frontend Testing Clinic",
    description: "Learn to test your frontend with confidence.",
    type: "Workshop",
    date: "2027-01-26",
    startTime: "09:00",
    endTime: "12:00",
    location: "Online",
    availability: "unspecified", //
    fee: 0,
  },
];

export type Registration = {
  id: string;
  event_name: string;
  id_event: string;
  id_user: string;
  date: string; 
};

export type User = {
  id: string;
  name: string;
};

export const users: User[] = [
  {
    id: "user-id-1",
    name: "Alice",
  },
  {
    id: "user-id-2",
    name: "Bob",
  },
];



export const registrations: Registration[] = [
  {
    id: "reg-1",
    id_event: "evt-001",
    event_name: "Product Design Sprint", 
    id_user: "user-id-1",
    date: "2026-11-02",
  },
  {
    id: "reg-2",
    id_event: "evt-002",
    event_name: "React Patterns Lab",
    id_user: "user-id-1",
    date: "2026-11-05",
  },
  {
    id: "reg-3",
    id_event: "evt-003",
    event_name: "Design Systems 101",
    id_user: "user-id-2",
    date: "2026-11-08",
  },
];
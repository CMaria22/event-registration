"use client"

import { ReactNode, useCallback, useRef, useState } from "react"
import { EventFilters } from "./EventFilters";
import { EventCatalog } from "./EventCatalog";
import type { Event, EventFilterValues } from "@/schemas/event";
import { getEventsFiltered } from "@/lib/events-api";

interface EventsExplorerProps {
  children:ReactNode
}
export type StatType = 
  {status: "idle"} |{status: "loading"} | {status:"error",message:string}| {status:"success",data:Event[]};

export function EventsExplorer({ children }: EventsExplorerProps) {
  const [events, setEvents] = useState<StatType>({ status: "idle" });
    const lastFilters = useRef<EventFilterValues | null>(null);
const search = useCallback(async (filters: EventFilterValues) => {
  lastFilters.current = filters;
  setEvents({ status: "loading" });
  try {
    const data = await getEventsFiltered(filters);
    setEvents({ status: "success", data });
  } catch (err) {
    setEvents({
      status: "error",
      message: err instanceof Error ? err.message : "Unknown error", // ApiError extinde Error
    });
  }
}, []);

const retry = () => {
  if (lastFilters.current) search(lastFilters.current);
};
  return (
    <>
      <div className="mt-8">
        <EventFilters onSearch={search} />
      </div>
      <section className="mt-8">
        {events.status === "idle" && children}
        {events.status === "loading" && <p>Loading...</p>}
        {events.status === "error" && (
          <div>
            <p role="alert">{events.message} </p>
            <button
              className="h-12 px-7  bg-primary hover:bg-deep-violet active:scale-[0.99] disabled:opacity-60 text-white text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              onClick={retry}
            >
              Retry
            </button>
          </div>
        )}
        {events.status === "success" && <EventCatalog events={events.data} />}
      </section>
    </>
  );
}


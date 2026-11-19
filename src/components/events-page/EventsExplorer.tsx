"use client"

import { useState } from "react"
import { EventFilters } from "./EventFilters";
import { EventCatalog } from "./EventCatalog";
import type { Event } from "@/schemas/event";

interface EventsExplorerProps {
  initialEvents: Event[];
}


export function EventsExplorer({ initialEvents }: EventsExplorerProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  return (
    <>
      <div className="mt-8">
        <EventFilters onResults={setEvents} />
      </div>
      <section className="mt-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Upcoming events{" "}
            <span className="text-sm font-normal text-slate-500">
              ({events.length})
            </span>
          </h2>
          <span className="text-sm text-slate-500">Sorted by: Soonest ▾</span>
        </div>
        <EventCatalog events={events} />
      </section>
    </>
  );
}
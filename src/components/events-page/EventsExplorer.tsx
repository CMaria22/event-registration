"use client"

import { ReactNode, useState } from "react"
import { EventFilters } from "./EventFilters";
import { EventCatalog } from "./EventCatalog";
import type { Event } from "@/schemas/event";

interface EventsExplorerProps {
  children:ReactNode
}

export function EventsExplorer({ children }: EventsExplorerProps) {
  const [events, setEvents] = useState<Event[]>();
  return (
    <>
      <div className="mt-8">
        <EventFilters onResults={setEvents} />
      </div>
      <section className="mt-8">
        {events !== undefined ? <EventCatalog events={events} /> : children}
      </section>
    </>
  );
}
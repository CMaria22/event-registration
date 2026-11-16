import { EventCatalog } from "@/components/events-page/EventCatalog";
import { EventFilters } from "@/components/events-page/EventFilters";
import Hero from "@/components/reusable-ui/Hero";
import { events } from "@/mocks/fixtures";
import type { Event } from "@/schemas/event";

export async function getInitialEvents(): Promise<Event[]> {
  return events;
}

export default async function EventsPage() {
   const events = await getInitialEvents();
  return (
    <>
 
    <div className="min-h-screen bg-[#f8f7fc]">
      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-8 sm:py-8">
        <Hero />

        <div className="mt-8">
          <EventFilters />
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
      </div>
    </div>

    </>
  );
}

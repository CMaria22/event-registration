
import { EventsExplorer } from "@/components/events-page/EventsExplorer";
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
          <EventsExplorer initialEvents={events} />
        </div>
      </div>
    </>
  );
}

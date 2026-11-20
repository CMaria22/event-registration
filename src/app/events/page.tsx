
import { EventCatalog } from "@/components/events-page/EventCatalog";
import { EventsExplorer } from "@/components/events-page/EventsExplorer";
import Hero from "@/components/reusable-ui/Hero";
import { getInitialEvents } from "@/lib/events-api";


export default async function EventsPage() {
  const events = await getInitialEvents();
  return (
    <>
      <div className="min-h-screen bg-[#f8f7fc]">
        <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-8 sm:py-8">
          <Hero />
          <EventsExplorer >
            <EventCatalog events={events} />
            </EventsExplorer >
        </div>
      </div>
    </>
  );
}

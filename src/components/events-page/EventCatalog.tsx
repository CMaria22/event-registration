import { Event } from "@/schemas/event";
import { EventCard } from "../reusable-ui/CardEvent";

interface EventCatalogProps {
  events: Event[];
}

export function EventCatalog({
  events
}: EventCatalogProps) {
  return (
    <section className="w-full">
      


      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} colorIndex={index} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-sm text-slate-500">
          No events found matching your criteria.
        </div>
      )}
    </section>
  );
}

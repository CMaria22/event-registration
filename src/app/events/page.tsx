"use client";

import { getEvents } from "@/lib/events-api";
import { useEffect, useState } from "react";

type Event = { id: string; name: string };

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const res = await getEvents();
        setEvents(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <>
      <h1>Events</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.name}</h2>
          <a href={`/events/${event.id}`}>View Event</a>
        </div>
      ))}
    </>
  );
}

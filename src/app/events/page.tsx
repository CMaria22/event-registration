"use client";

import { useEffect, useState } from "react";

type Event = { id: string; name: string };

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.example.com/events").then((res) =>
          res.json(),
        );
        if (!res) setError(res.error || "Failed to fetch events");
        setEvents(res);
      } catch (err ) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.name}</h2>
          <a href={`/events/${event.id}`}>View Event</a>
        </div>
      ))}
    </>
  );
}

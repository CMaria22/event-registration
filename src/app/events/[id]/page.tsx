"use client";

import { use, useEffect, useState } from "react";

type Event = {
  id: string;
  name: string;
  description: string;
};

export default function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function loadEvent() {
        try {
          setLoading(true);
          setError(null);
          const res = await fetch(`https://api.example.com/events/${id}`);
          if (!res.ok) throw new Error(`Request failed: ${res.status}`);
          setEvent(await res.json());
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }

      loadEvent();
    }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return null;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
    </div>
  );
}

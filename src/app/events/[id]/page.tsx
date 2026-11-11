"use client";

import { createRegistration, getEventById } from "@/lib/events-api";
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
  const [registrationSuccessMessage, setRegistrationSuccess] = useState("");
  const [registrationErrorMessage, setRegistrationError] = useState("");
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await getEventById(id);
        setEvent(res);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);
  const handleRegister = async () => {
    if (!event) return;
    const registration = {
      id_event: event.id,
      id_user: "user-id-1", // Replace with the actual user ID
      event_name: event.name,
      date: new Date().toISOString(),
    };
    try {
      await createRegistration(registration);
      setRegistrationSuccess("Registration successful!");
      setRegistrationError("");
    } catch (err) {
      setRegistrationError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      setRegistrationSuccess("");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return null;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <button onClick = { async () => {
       await handleRegister();
      }}>
        Register
      </button>
      {registrationSuccessMessage && (
        <p style={{ color: "green" }}>{registrationSuccessMessage}</p>
      )}
      {registrationErrorMessage && (
        <p style={{ color: "red" }}>{registrationErrorMessage}</p>
      )}
    </div>
  );
}


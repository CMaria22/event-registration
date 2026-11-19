"use client";

import { createRegistration } from "@/lib/events-api";
import { Event } from "@/schemas/event";
import { useRef, useState } from "react";

interface RegisterButtonProps {
  event: Event;
  label?: string;
}

export function RegisterButton({
  event,
  label = "Register",
}: RegisterButtonProps) {
  const [isLoading, setLoading] = useState(false);
 
  const isRequesting = useRef(false);

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const createRegistrationFunc = async () => {
    
    if (isRequesting.current) return;

    isRequesting.current = true;

    setLoading(true);

    const body = {
      id_user: "user-id-1",
      id_event: event.id,
      event_name: event.name,
      date: new Date().toISOString(),
    };

    try {
      await sleep(200);
      await createRegistration(body);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";

      alert(message);
    } finally {
      isRequesting.current = false;
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={createRegistrationFunc}
      className="h-8 px-4 bg-[#6338F5] hover:bg-[#5228E0] active:scale-[0.99] disabled:opacity-60 text-white text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
    >
      {isLoading ? "Registering..." : label}
    </button>
  );
}



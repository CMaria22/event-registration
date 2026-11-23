"use client";

import { ApiError, getEvents } from "@/lib/events-api";
import { useEffect, useState } from "react";
import { type Event } from "@/schemas/event";
export type StatType = {
  status: "idle"|"loading" | "success" | "error";
  message?: string;
  data?: Event[];
};

export function useGetEvents() {
  const [status, setStatus] = useState<StatType>({ status: "idle" });
  useEffect(() => {
    let ignore = false;
    setStatus({status:"loading"})
    getEvents()
      .then((r) =>{
        if(!ignore){
        setStatus({
          status: "success",
          message: "There are the events:",
          data: r,
        })
    }}
      )
      .catch((err) =>{
        if (!ignore) {
          setStatus({
            status: "error",
            message: err instanceof ApiError ? err.message : "Unexpected error",
          });
        }
      }
  );
    return ()=>{ ignore = true; setStatus({status:"idle"})}
  }, []);
  return status;
}

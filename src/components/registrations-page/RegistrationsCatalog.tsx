"use client";

import { deleteRegistration, getMyRegistrations } from "@/lib/events-api";
import { Registration } from "@/mocks/fixtures";
import { useEffect, useState } from "react";


export default function RegistrationsCatalog({ user_id }: { user_id: string }) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDelete, setDeleteError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    let cancelled = false;
    const loadRegistrations = async () => {
        setError(null);
      try {
        setLoading(true);
        const res = await getMyRegistrations(user_id);
        if(!cancelled)
            setRegistrations(res);
      } catch (err) {
        if(!cancelled){
            if(err instanceof Error){
                if(err.message.match(/401/)){
                    setError("Session expired — sign in again");
                }
                else{
                    setError(err.message)
                }
            }
            else{
                setError("Unkown error!")
            }
        }
      } finally {
        if(!cancelled)
            setLoading(false);
      }
    };
    loadRegistrations();
    return ()=>{
        cancelled=true;
    }
  }, [user_id,reloadKey]);


  const handleDelete = async (id: string) => {
    setDeleteError(null);
    setDeletingId(id);
    try {
      await deleteRegistration(id);
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Could not delete registration",
      );
    } finally {
      setDeletingId(null);
    }
  };

    if (loading) return <p>Loading...</p>;

    if (error)
      return (
        <div role="alert">
          <p>{error}</p>
          <button onClick={() => setReloadKey((k) => k + 1)}>Retry</button>
        </div>
      );

    if (registrations.length === 0) return <p>No registrations found.</p>;
  return (
    <>
     
      
        <ul>
          {registrations.map((registration) => (
            <li key={registration.id}>
              Event ID: {registration.id_event}, User ID: {registration.id_user}
              , Event Name: {registration.event_name}, Date: {registration.date}
              <button
                onClick={async () => {
                  await handleDelete(registration.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
          {errorDelete && <p>Error: {errorDelete}</p>}
          {deletingId && <p>Deleting registration with ID: {deletingId}...</p>}
        </ul>
     
    </>
  );
}
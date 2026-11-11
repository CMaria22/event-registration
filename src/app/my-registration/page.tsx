"use client";
import { getMyRegistrations , deleteRegistration } from "@/lib/events-api";
import {Registration} from "@/schemas/registration";
import { useEffect, useState } from "react";

export default function MyRegistrationPage() {
  const user_id = "user-id-1"; // Replace with the actual user ID
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDelete, setDeleteError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  useEffect(() => {
    const loadRegistrations = async () => {
      try{
        setLoading(true);
        const res = await getMyRegistrations(user_id);
        setRegistrations(res);  
      }catch(err){
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      }finally{
        setLoading(false);
      }
    };
    loadRegistrations();
  }, [user_id]);
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

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && registrations.length === 0 && <p>No registrations found.</p>}
      {!loading && !error && registrations.length > 0 && (
        <ul>
          {registrations.map((registration) => (
            <li key={registration.id}>
              Event ID: {registration.id_event}, User ID: {registration.id_user}, Event Name: {registration.event_name}, Date: {registration.date}
               <button onClick={async () => { await handleDelete(registration.id); }}>Delete</button>
            </li>
            
          ))}
          {errorDelete && <p>Error: {errorDelete}</p>}
          {deletingId && <p>Deleting registration with ID: {deletingId}...</p>}
        </ul>
      )}
    </>
  );
}


"use client";

import { deleteRegistration, getMyRegistrations } from "@/lib/events-api";
import { Registration } from "@/mocks/fixtures";
import { ApiError } from "@/lib/events-api";
import { useEffect, useState } from "react";

type RegistrationsState =
  | { status: "idle" } 
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; registrations: Registration[] };

export default function RegistrationsCatalog({ user_id }: { user_id?: string }) {
  const [status,setStatus]=useState<RegistrationsState>({status:"idle"});
  const [errorDelete, setDeleteError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

useEffect(() => {
  if (!user_id) {
    setStatus({ status: "error", message:"This user is not authenticated!" });
    return;
  }

  let cancelled = false;
  setStatus({ status: "loading" });

  getMyRegistrations(user_id)
    .then((registrations) => {
      if (cancelled) return;
      setStatus({ status: "success", registrations });
    })
    .catch((err) => {
      if (cancelled) return;
      setStatus({ status: "error", message: err.message });
    });

  return () => {
    cancelled = true;
  };
}, [user_id, reloadKey]);


  const handleDelete = async (id: string) => {
    setDeleteError(null);
    setDeletingId(id);
    try {
      await deleteRegistration(id);
      setStatus((prev) =>
        prev.status === "success"
          ? {
              status: "success",
              registrations: prev.registrations.filter((r) => r.id !== id),
            }
          : prev,
      );
    } catch (err) {
      setDeleteError(
        err instanceof ApiError ? err.message : "Could not delete registration",
      );
    } finally {
      setDeletingId(null);
    }
  };

    if (status.status==="loading") return <p>Loading...</p>;

    if (status.status==="error")
      return (
        <div role="alert">
          <p>{status.message}</p>
          <button onClick={() => setReloadKey((k) => k + 1)}>Retry</button>
        </div>
      );

    if (status.status==="success"&&status.registrations.length === 0) return <p>No registrations found.</p>;
  return (
    <>
      <ul>
        {status.status==="success"&&status.registrations.map((registration) => (
          <li key={registration.id}>
            Event ID: {registration.id_event}, User ID: {registration.id_user},
            Event Name: {registration.event_name}, Date: {registration.date}
            <button
              onClick={async () => {
                await handleDelete(registration.id);
              }}
              disabled={deletingId === registration.id}
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
test.describe("SSR", () => {
  test.use({ javaScriptEnabled: false });

  test("events are rendered on the server", async ({ page }) => {
    await page.goto("/events");
    await expect(
      page.getByRole("heading", { name: "Upcoming events" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Product Design Sprint" }),
    ).toBeVisible();
  });
});
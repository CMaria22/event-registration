
import {  render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { server } from "@/mocks/server";
import { conflictResponse, serverErrorResponse,eventResponse } from "@/mocks/scenarios";
import  EventsPage  from "../page"
import EventPage from "../[id]/page";
import { act, Suspense } from "react";



test("shows the server error with status", async () => {
  server.use(serverErrorResponse);
  render(<EventsPage />);
  expect(
    await screen.findByText(/Internal Server Error \(500\)/),
  ).toBeInTheDocument();
});


test("shows what happens when you're registered for an event", async () => {
  server.use(eventResponse);

  await act(async () => {
    render(
      <Suspense fallback={<p>Loading...</p>}>
        <EventPage params={Promise.resolve({ id: "evt-test" })} />
      </Suspense>,
    );
  });
  const title = await screen.findByRole("heading", {name: /Test/});
  expect(title).toBeInTheDocument();

  const registerButton = await screen.findByRole("button", {
    name: /Register/,
  });

  server.use(conflictResponse);
  registerButton.click();

  const errorMessage = await screen.findByText(
    /Already registered for this event \(409\)/,
  );
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
});

import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { server } from "@/mocks/server";
import { conflictResponse, eventResponse } from "@/mocks/scenarios";
import EventPage from "../[id]/page";
import { act, Suspense } from "react";
import { delay, http, HttpResponse } from "msw";
import { RegisterButton } from "@/components/reusable-ui/RegisterButton";
import { type Event } from "@/schemas/event"
/*
acum acea pagina e mock si nu mai apeleaza handlerele
test("shows the server error with status", async () => {
  server.use(serverErrorResponse);
  render(<EventsPage />);
  expect(
    await screen.findByText(/Internal Server Error \(500\)/),
  ).toBeInTheDocument();
});
*/

test("shows what happens when you're registered for an event", async () => {
  server.use(eventResponse);

  await act(async () => {
    render(
      <Suspense fallback={<p>Loading...</p>}>
        <EventPage params={Promise.resolve({ id: "evt-test" })} />
      </Suspense>,
    );
  });
  const title = await screen.findByRole("heading", { name: /Test/ });
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

test("A request is pending", async () => {
  server.use(
    http.post("https://api.example.com/registrations", async () => {
      await delay("infinite");
      return HttpResponse.json({});
    }),
  );
  const event_test : Event = {
    id: "evt-test",
    name: "Test event",
    description: "Description of the test event.",
    type: "Workshop",
    date: "2027-01-04",
    startTime: "09:00",
    endTime: "12:00",
    location: "Bucharest",
    availability: "limited",
    availableSeats: 5,
    fee: 0,
  };
  render(<RegisterButton event={event_test}/>);
  const button = screen.getByRole("button", { name: "Register" });
  button.click()
  const button_pending = await screen.findByRole("button", { name: "Registering..." });
  expect(button_pending).toBeDisabled();
});

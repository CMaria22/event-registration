import { render, screen, waitFor } from "@testing-library/react";
import { test, expect } from "vitest";
import { server } from "@/mocks/server";
import { conflictResponse, eventResponse } from "@/mocks/scenarios";
import EventPage from "../[id]/page";
import { act, Suspense } from "react";
import { delay, http, HttpResponse } from "msw";
import { RegisterButton } from "@/components/reusable-ui/RegisterButton";
import { type Event } from "@/schemas/event";
import { EventsExplorer } from "@/components/events-page/EventsExplorer";
import { EventCatalog } from "@/components/events-page/EventCatalog";
import { events } from "@/mocks/fixtures";
import userEvent from "@testing-library/user-event";
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
    location: "Bucharest",
    availability:{kind:"limited",remaining:5},
    fee: 0,
  };
  render(<RegisterButton event={event_test}/>);
  const button = screen.getByRole("button", { name: "Register" });
  button.click()
  const button_pending = await screen.findByRole("button", { name: "Registering..." });
  expect(button_pending).toBeDisabled();
});

test("typing 'prod' in search shows only the matching event", async () => {
  const user = userEvent.setup();
  render(
    <EventsExplorer>
      <EventCatalog events={events} />
    </EventsExplorer>,
  );


  expect(screen.getAllByRole("article")).toHaveLength(events.length);

  await user.type(screen.getByPlaceholderText(/search workshops/i), "prod");
  await user.click(screen.getByRole("button", { name: "Search" }));


  await waitFor(() => expect(screen.getAllByRole("article")).toHaveLength(1));
  expect(
    screen.getByRole("heading", { name: "Product Design Sprint" }),
  ).toBeInTheDocument();
  expect(screen.queryByText("React Patterns Lab")).not.toBeInTheDocument();
});
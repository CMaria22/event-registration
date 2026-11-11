// src/components/events-list.test.tsx
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { server } from "@/mocks/server";
import { serverErrorResponse } from "@/mocks/scenarios";
import  EventsPage  from "../page"

test("shows the server error with status", async () => {
  server.use(serverErrorResponse);
  render(<EventsPage />);
  expect(
    await screen.findByText(/Internal Server Error \(500\)/),
  ).toBeInTheDocument();
});

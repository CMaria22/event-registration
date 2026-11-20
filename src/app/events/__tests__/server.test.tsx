// @vitest-environment node

import { expect, test } from "vitest";
import EventsPage from "../page";
import { renderToString } from "react-dom/server";
import {events} from "@/mocks/fixtures"


test("A Server Component renders", async () => {
  const page = await EventsPage();
  const html = renderToString(page);
  expect(html.includes("Learn something new, together.")).toBeTruthy();//from HeroCard
  events.forEach(
    (e)=>
    expect(html).toContain(e.name)
  )
});
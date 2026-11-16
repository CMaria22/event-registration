import { test, expect } from '@playwright/test';

test("has h2 Events", async ({ page }) => {
  await page.goto("/events");

  await expect(
   page.getByRole("heading", { name: "Upcoming events" }),
 ).toBeVisible();

  await expect(
   page.getByRole("heading", { name: "Product Design Sprint" }),
 ).toBeVisible();
});


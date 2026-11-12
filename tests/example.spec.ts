import { test, expect } from '@playwright/test';

test("has h1 Events", async ({ page }) => {
  await page.goto("/events");

  await expect(page.locator("h1")).toHaveText("Events");
  await expect(page.getByText("Product Design Sprint")).toBeVisible();
});


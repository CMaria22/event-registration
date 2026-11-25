import { test, expect } from "@playwright/test";
import { registrations } from "@/mocks/fixtures";

test("has h2 Events", async ({ page }) => {
  await page.goto("/events");

  await expect(
    page.getByRole("heading", { name: "Upcoming events" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Product Design Sprint" }),
  ).toBeVisible();
});

test("alice page contains alice's events", async ({ page }) => {
  await page.goto("/my-registration");
  await page.click('button:has-text("Alice")');
  const alicereg = registrations.filter((r) => r.id_user === "user-id-1");
  for (const r of alicereg) {
    await expect(
      page.getByRole("listitem").filter({ hasText: `${r.event_name}` }),
    ).toBeVisible();
  }
});
test("401 handling response", async ({ page }) => {
  await page.route("**/registrations/*", async (route) => {
    if (route.request().resourceType() === "fetch") {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Unauthorized",
          status: 401,
          isSuccess: false,
        }),
      });
    }
  });
  await page.goto("/my-registration");
  await page.click('button:has-text("Alice")');

  const alert = page
    .getByRole("alert")
    .filter({ has: page.getByRole("button", { name: "Retry" }) });
  await expect(alert).toBeVisible();
});

test("A request is pending", async ({ page }) => {
  await page.goto("/events");
  const button = page.locator("button", { hasText: "Register" });
  await button.first().click();
  expect(await button.first().textContent()).toBe("Registering...");
  expect(await button.first().isDisabled()).toBeTruthy();
});

test("events are rendered on the server", async ({ request }) => {
  const res = await request.get("/events");
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain("Upcoming events");
  expect(html).toContain("Product Design Sprint");
});


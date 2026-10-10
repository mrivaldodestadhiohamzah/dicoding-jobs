import { expect, test } from "@playwright/test";

test.describe("vacancy discovery", () => {
  test("lists vacancies, searches by title, and opens the matching detail", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Browse vacancies" })).toBeVisible();
    await expect(page.getByTestId("job-card").first()).toBeVisible();

    const search = page.getByRole("searchbox", { name: "Search by job title" });
    await search.fill("frontend");
    await expect(page.getByTestId("job-card")).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "Senior Frontend Engineer" })).toBeVisible();

    await page.getByRole("link", { name: /View Senior Frontend Engineer/ }).click();
    await expect(page).toHaveURL(/\/vacancies\/\d+$/);
    await expect(page.getByTestId("vacancy-details")).toContainText("Senior Frontend Engineer");
    await expect(page.getByTestId("vacancy-details")).toContainText("Northstar Labs");
  });

  test("shows a useful empty state for a search with no matches", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("searchbox", { name: "Search by job title" }).fill("role-that-does-not-exist");
    await expect(page.getByTestId("empty-state")).toContainText("No vacancies match that search.");
  });

  test("shows a not-found state for an unknown vacancy", async ({ page }) => {
    await page.goto("/vacancies/999999");
    await expect(page.getByTestId("not-found-state")).toContainText("That vacancy isn’t available.");
  });

  test("allows a recruiter to publish a vacancy through the API", async ({ page }) => {
    await page.goto("/vacancies/new");
    await page.getByLabel("Job title").fill("Operations Coordinator");
    await page.getByLabel("Company").fill("Field Notes Co.");
    await page.getByLabel("Location").fill("Surabaya, Indonesia");
    await page.getByLabel("Employment type").selectOption("Part-time");
    await page.getByLabel("Work arrangement").selectOption("Remote");
    await page.getByLabel("Description").fill("Coordinate the details that keep a small, growing product team moving with care and clarity.");
    await page.getByRole("button", { name: "Publish vacancy" }).click();

    await expect(page).toHaveURL(/\/vacancies\/\d+$/);
    await expect(page.getByTestId("vacancy-details")).toContainText("Operations Coordinator");
    await expect(page.getByTestId("vacancy-details")).toContainText("Field Notes Co.");
  });
});

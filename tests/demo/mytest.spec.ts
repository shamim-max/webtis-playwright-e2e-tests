import { test, expect } from "@playwright/test";

test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title} having tag ${test.info().tags}`);
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
  });
  
  test("Should login successfully *@smoke*", async ({ page }) => {
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.locator("#login")).toContainText(
      "Please login to make appointment.",
    );
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page.getByRole("heading", { name: "Make Appointment" }),
    ).toBeVisible();
  });

  test("Should prevent login", { tag: "@smoke" }, async ({ page }) => {
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.locator("#login")).toContainText(
      "Please login to make appointment.",
    );
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Login failed! Please ensure")).toBeVisible();
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });

  test("Should make an appointment", { tag: "@smoke" }, async ({ page }) => {
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.locator("#login")).toContainText(
      "Please login to make appointment.",
    );

    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByRole("heading", { name: "Make Appointment" }),
    ).toBeVisible();

    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page.getByText("Medicaid").click();
    await page.getByRole("radio", { name: "Medicaid" }).check();
    await page.locator("span").click();
    await page.getByRole("cell", { name: "22" }).click();
    await page.getByRole("textbox", { name: "Comment" }).fill("Test");
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(
      page.getByRole("heading", { name: "Appointment Confirmation" }),
    ).toBeVisible();
  });
});

test(
  "Should load homepage with correct title",
  { tag: "@smoke" },
  async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
  },
);

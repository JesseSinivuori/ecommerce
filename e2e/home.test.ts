import { test, expect } from "@playwright/test";
import {
  cartButton,
  checkCartQuantity,
  mobileMenuButton,
  shoppingCart,
} from "./helpers/helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForResponse(/m.stripe/);
});

test.describe("on the home page", () => {
  test("has a title", async ({ page }) => {
    await expect(page).toHaveTitle("Jesse's Kitchen");
  });

  test("Order Now button is visible", async ({ page }) => {
    await expect(page.getByText("Order Now")).toBeVisible();
  });

  test("nav links are rendered", async ({ page, isMobile }) => {
    if (!isMobile) {
      const navbar = page.getByRole("navigation");
      const navLinks = (await navbar.allInnerTexts()).join(",");

      [".", "j", "s", "Home", "Contact", "0"].map((link) => {
        expect(navLinks).toContain(link);
      });
    } else {
      await mobileMenuButton(page).click();
      const mobileMenu = page.getByRole("navigation");
      const navLinks = (await mobileMenu.allInnerTexts()).join(",");

      [".", "j", "s", "0"].map((link) => {
        expect(navLinks).toContain(link);
      });
    }
  });

  test("cart is not initially visible", async ({ page }) => {
    await expect(shoppingCart(page)).not.toBeInViewport();
  });

  test("cart opens", async ({ page }) => {
    await cartButton(page).click();
    await expect(shoppingCart(page)).toBeInViewport();
  });

  test("cart quantity is initially 0", async ({ page }) => {
    await checkCartQuantity(page, "0");
  });

  test("navigates to a product", async ({ page }) => {
    await page.waitForLoadState();
    await page.getByText("Ramen").click();
    await page.waitForURL("/product/ramen");
  });
});

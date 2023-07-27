import { Page } from "@playwright/test/types/test";

export const cartButton = (page: Page) =>
  page.getByRole("button", { name: "toggle cart" });

export const checkCartQuantity = async (page: Page, expected: string) =>
  await page.waitForFunction(
    async ([cartQuantity, expected]) => cartQuantity === expected,
    [await cartButton(page).innerText(), expected]
  );

export const addToCartButton = (page: Page) =>
  page.getByRole("button", { name: "Add to Cart" });

export const mobileMenuButton = (page: Page) =>
  page.getByLabel("toggle mobile menu");

export const shoppingCart = (page: Page) => page.getByLabel("shopping cart");

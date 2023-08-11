import { test, expect } from "@playwright/test";
import {
  addToCartButton,
  cartButton,
  checkCartQuantity,
  shoppingCart,
} from "./helpers/helpers";

const skipInCI = process.env.CI ? "Long test skipped in CI" : "";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForResponse(/m.stripe/);
});

test.describe("long journies", () => {
  test.skip(skipInCI !== "", skipInCI);
  test("checks out successfully", async ({ page }) => {
    test.setTimeout(1000 * 60 * 3);
    await test.step("navigates to a product", async () => {
      await page.getByText("Pancakes").click();
      await page.waitForURL("/product/pancakes");
    });
    await test.step("adds 1 product to cart", async () => {
      await addToCartButton(page).click();
      await checkCartQuantity(page, "1");
    });
    await test.step("opens cart", async () => {
      await cartButton(page).click();
      await expect(shoppingCart(page)).toBeInViewport();
    });
    await test.step("navigates to stripe checkout", async () => {
      await page.getByRole("button", { name: "Checkout", exact: true }).click();
      await page.waitForURL(/checkout.stripe.com/);
    });
    await test.step("fills payment info and checks out", async () => {
      await page.locator('input[name="email"]').fill("test@email.com");
      await page
        .locator('input[name="cardNumber"]')
        .fill("4242 4242 4242 4242");
      await page.locator('input[name="cardExpiry"]').fill("424");
      await page.locator('input[name="cardCvc"]').fill("4242");
      await page.locator('input[name="billingName"]').fill("test");
      await page.getByTestId("hosted-payment-submit-button").click();
    });
    await test.step("redirected to /payment/success ", async () => {
      await page.waitForURL(/\/payment\/success/);
      await page.waitForResponse(/stripe/);
      await expect(page.getByText("Thank You For Ordering!")).toBeVisible();
    });
    await test.step("continues to home page", async () => {
      await page.getByRole("link", { name: "Continue Shopping" }).click();
      await page.waitForURL("/");
      await expect(
        page.getByRole("heading", { name: "Jesse's Kitchen" })
      ).toBeVisible();
    });
    await test.step("cart is emptied", async () => {
      await checkCartQuantity(page, "0");
    });
  });

  test("cancels checkout", async ({ page }) => {
    test.setTimeout(1000 * 60 * 3);
    await test.step("navigates to a product", async () => {
      await page.getByText("Pancakes").click();
      await page.waitForURL("/product/pancakes");
      await checkCartQuantity(page, "0");
    });
    await test.step("adds 1 product to cart", async () => {
      await addToCartButton(page).click();
      await checkCartQuantity(page, "1");
    });
    await test.step("opens the cart", async () => {
      await cartButton(page).click();
      await expect(shoppingCart(page)).toBeInViewport();
    });
    await test.step("navigates to stripe checkout", async () => {
      await page.getByText("Checkout", { exact: true }).click();
      await page.waitForURL(/checkout.stripe.com/);
    });
    await test.step("cancels checkout", async () => {
      await page
        .getByRole("link", {
          name: "Back to Business",
        })
        .click();
    });
    await test.step("redirected to /payment/cancel ", async () => {
      await page.waitForURL(/\/payment\/cancel/);
      await page.waitForResponse(/stripe/);
      await expect(page.getByText(/Your order was canceled./)).toBeVisible();
    });
    await test.step("continues to home page", async () => {
      await page
        .getByRole("link", {
          name: "Continue Shopping",
        })
        .click();
      await page.waitForURL("/");
      await expect(
        page.getByRole("heading", { name: "Jesse's Kitchen" })
      ).toBeVisible();
    });
    await test.step("cart still has the product", async () => {
      await checkCartQuantity(page, "1");
    });
  });

  test("adds many products to cart and goes crazy", async ({ page }) => {
    test.slow();
    await test.step("navigates to a product(bread, 9.99€)", async () => {
      await page.getByText("Bread").click();
      await page.waitForURL("/product/bread");
    });
    await test.step("adds 1 product to cart(bread, 9.99€)", async () => {
      await checkCartQuantity(page, "0");
      await addToCartButton(page).click();
      await checkCartQuantity(page, "1");
    });
    await test.step("navigates to a product(pizza, 16.99€)", async () => {
      await page.getByText("Pizza").click();
      await page.waitForURL("/product/pizza");
      await checkCartQuantity(page, "1");
    });
    await test.step("adds a second product to cart(pizza, 16.99€)", async () => {
      await addToCartButton(page).click();
      await checkCartQuantity(page, "2");
    });
    await test.step("navigates to a product(steak, 12.99€)", async () => {
      await page.getByText("Steak").click();
      await page.waitForURL("/product/steak");
    });
    await test.step("adds a second product to cart(steak, 12.99€)", async () => {
      await addToCartButton(page).click();
      await checkCartQuantity(page, "3");
    });
    await test.step("opens cart with Order Now button(adds one more steak, 12.99€)", async () => {
      await page.getByRole("button", { name: "Order Now" }).click();
      await checkCartQuantity(page, "4");
      await expect(shoppingCart(page)).toBeInViewport();
    });
    await test.step("opens cart with Order Now button", async () => {
      const totalPrice = await page.getByLabel(/total price/).innerText();
      const calculatedTotal = (
        Math.round((9.99 + 16.99 + 12.99 * 2) * 100) / 100
      ).toFixed(2);

      expect(totalPrice).toEqual("52.96€");
      expect(totalPrice).toEqual(`${calculatedTotal}€`);
    });
  });

  test("adds many products to cart and goes extra crazy", async ({
    page,
    isMobile,
  }) => {
    test.setTimeout(1000 * 60 * 3);
    await test.step("navigates to a product(bread, 9.99€)", async () => {
      await page.getByText("Bread").click();
      await page.waitForURL("/product/bread");
    });
    await test.step("adds 15 products to cart(bread, 9.99€)", async () => {
      await checkCartQuantity(page, "0");
      await page
        .getByRole("main")
        .getByRole("button", { name: "add one bread" })
        .click({ clickCount: 14 });
      await addToCartButton(page).click();

      await checkCartQuantity(page, "15");
    });
    await test.step("navigates to a product(pizza, 16.99€)", async () => {
      await page.getByText("Pizza").click();
      await page.waitForURL("/product/pizza");
    });
    await test.step("adds 24 products to cart(pizza, 16.99€)", async () => {
      await page
        .getByRole("main")
        .getByRole("button", { name: "add one pizza" })
        .click({ clickCount: 23 });
      await addToCartButton(page).click();
      await checkCartQuantity(page, "39");
    });
    await test.step("goes to home page(with Home nav link(.js link on mobile))", async () => {
      if (isMobile) {
        await page.getByLabel("go to home").click();
      } else {
        await page.getByRole("link", { name: "Home", exact: true }).click();
      }
    });
    await test.step("navigates to a product(steak, 12.99€)", async () => {
      await page.getByText("Steak").click();
      await page.waitForURL("/product/steak");
    });
    await test.step("adds 10 products to cart(steak, 12.99€)", async () => {
      await page
        .getByRole("main")
        .getByRole("button", { name: "add one steak" })
        .click({ clickCount: 9 });
      await addToCartButton(page).click();
      await checkCartQuantity(page, "49");
    });
    await test.step("opens cart with Order Now button(adds 27 steaks, 12.99€)", async () => {
      await page
        .getByRole("main")
        .getByLabel("remove one steak")
        .click({ clickCount: 26 });
      await page.getByRole("button", { name: "Order Now" }).click();
      await checkCartQuantity(page, "50");
      await expect(shoppingCart(page)).toBeInViewport();
    });
    await test.step("checks total price", async () => {
      const totalPrice = await page.getByLabel("total price").innerText();
      const calculatedTotal = (
        Math.round((15 * 9.99 + 24 * 16.99 + 11 * 12.99) * 100) / 100
      ).toFixed(2);

      expect(totalPrice).toEqual("700.50€");
      expect(totalPrice).toEqual(`${calculatedTotal}€`);
    });
    await test.step("checks cart quantity in cart", async () => {
      expect(
        (await page.getByLabel("close cart").allInnerTexts()).join("")
      ).toContain("50");
    });
    await test.step("goes crazy with plus/minus buttons in cart", async () => {
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one bread" })
        .click({ clickCount: 8 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("bread quantity")
          .innerText()
      ).toEqual("7");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "add one bread" })
        .click({ clickCount: 13 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("bread quantity")
          .innerText()
      ).toEqual("20");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "add one pizza" })
        .click({ clickCount: 24 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("pizza quantity")
          .innerText()
      ).toEqual("48");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one bread" })
        .click({ clickCount: 4 });
      expect(await page.getByLabel("bread quantity").innerText()).toEqual("16");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "add one bread" })
        .click({ clickCount: 8 });
      expect(await page.getByLabel("bread quantity").innerText()).toEqual("24");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one steak" })
        .click({ clickCount: 5 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("steak quantity")
          .innerText()
      ).toEqual("6");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "add one steak" })
        .click({ clickCount: 13 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("steak quantity")
          .innerText()
      ).toEqual("19");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one steak" })
        .click({ clickCount: 1 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("steak quantity")
          .innerText()
      ).toEqual("18");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "add one steak" })
        .click({ clickCount: 11 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("steak quantity")
          .innerText()
      ).toEqual("29");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one pizza" })
        .click({ clickCount: 2 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("pizza quantity")
          .innerText()
      ).toEqual("46");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "add one pizza" })
        .click({ clickCount: 3 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("pizza quantity")
          .innerText()
      ).toEqual("49");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "add one steak" })
        .click({ clickCount: 1 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("steak quantity")
          .innerText()
      ).toEqual("30");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one steak" })
        .click({ clickCount: 1 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("steak quantity")
          .innerText()
      ).toEqual("29");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "add one steak" })
        .click({ clickCount: 1 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("steak quantity")
          .innerText()
      ).toEqual("30");
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one bread" })
        .click({ clickCount: 1 });
      expect(
        await page
          .getByLabel("shopping cart")
          .getByLabel("bread quantity")
          .innerText()
      ).toEqual("23");
    });
    await test.step("checks total price", async () => {
      const totalPrice = await page.getByLabel("total price").innerText();

      const calculatedTotal = (
        Math.round((23 * 9.99 + 49 * 16.99 + 30 * 12.99) * 100) / 100
      ).toFixed(2);

      expect(totalPrice).toEqual("1451.98€");
      expect(totalPrice).toEqual(`${calculatedTotal}€`);
    });
    await test.step("checks cart quantity in cart", async () => {
      await checkCartQuantity(page, "102");
      expect(
        (await page.getByLabel("close cart").allInnerTexts()).join("")
      ).toContain("102");
    });
    await test.step("removes bread and pizza", async () => {
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one bread" })
        .click({ clickCount: 23 });
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one pizza" })
        .click({ clickCount: 49 });
      await page
        .getByLabel("shopping cart")
        .getByLabel("remove one Steak")
        .click({ clickCount: 29 });
    });
    await test.step("checks total price", async () => {
      const totalPrice = await page.getByLabel(/total price/).innerText();
      const calculatedTotal = (Math.round(12.99 * 100) / 100).toFixed(2);

      expect(totalPrice).toEqual("12.99€");
      expect(totalPrice).toEqual(`${calculatedTotal}€`);
    });

    await test.step("closes cart", async () => {
      await page.getByRole("button", { name: "close cart" }).click();
      await expect(shoppingCart(page)).not.toBeInViewport();
    });
    await test.step("goes to home page", async () => {
      await page.goto("/");
      await page.waitForResponse(/stripe/);
    });
    await test.step("navigates to a product(chocolate cake, 25.99€)", async () => {
      await page.getByText("Chocolate cake").click();
      await page.waitForURL("/product/chocolate-cake");
    });
    await test.step("adds 15 products to cart(chocolate cake, 9.99€)", async () => {
      await checkCartQuantity(page, "1");
      await page
        .getByRole("button", {
          name: "add one chocolate cake",
        })
        .click({ clickCount: 14 });
      await addToCartButton(page).click();
      await checkCartQuantity(page, "16");
    });
    await test.step("navigates to a product(pancakes cake, 25.99€)", async () => {
      await page.getByText("Pancakes").click();
      await page.waitForURL("/product/pancakes");
    });
    await test.step("adds 7 products to cart(pancakes cake, 22.99€)", async () => {
      await page
        .getByRole("button", {
          name: "add one pancakes",
        })
        .click({ clickCount: 6 });
      await addToCartButton(page).click();
      await checkCartQuantity(page, "23");
    });
    await test.step("goes to home page", async () => {
      await page.goto("/");
      await page.waitForResponse(/stripe/);
    });
    await test.step("goes to greek salad", async () => {
      await page.getByText("Greek salad").click();
      await page.waitForURL("/product/greek-salad");
    });
    await test.step("goes to home page(with .js nav link)", async () => {
      await page.getByLabel("go to home").click();
    });
    await test.step("goes to burger", async () => {
      await page.getByText("Burger").click();
      await page.waitForURL("/product/burger");
    });
    await test.step("opens cart", async () => {
      await cartButton(page).click();
      await expect(shoppingCart(page)).toBeInViewport();
    });
    await test.step("removes all items from cart", async () => {
      await page
        .getByLabel("shopping cart")

        .getByRole("button", { name: "remove one steak" })
        .click({ clickCount: 1 });
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one chocolate cake" })
        .click({ clickCount: 15 });
      await page
        .getByLabel("shopping cart")
        .getByRole("button", { name: "remove one pancakes" })
        .click({ clickCount: 7 });
    });
    await test.step("goes to home page", async () => {
      await page.goto("/");
      await page.waitForResponse(/stripe/);
    });
    await test.step("opens cart", async () => {
      await cartButton(page).click();
      await expect(shoppingCart(page)).toBeInViewport();
    });
    await test.step("checks total quantity", async () => {
      await checkCartQuantity(page, "0");
    });
    await test.step("checks total price", async () => {
      await expect(page.getByText("It's empty... 👀")).toBeVisible();
    });
  });
});

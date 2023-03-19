import { test as base } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { StorageState } from "../fixtures/storageState";
import { ProductListingPage } from "../pages/productListingPage";
import { CartPage } from "../pages/cartPage";
import { ProductDisplayPage } from "../pages/productDisplayPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { OrderConirmPage } from "../pages/orderConfirmPage";

type CustomFixtures = {
  home: HomePage;
  PLP: ProductListingPage;
  cart: CartPage;
  PDP: ProductDisplayPage;
  checkout: CheckoutPage;
  orderConfirm: OrderConirmPage;
  // storageState: StorageState;
};

export const test = base.extend<CustomFixtures>({
  // page: async ({ browser, baseURL }, use) => {
  //   const state = new StorageState(baseURL);
  //   const context = await browser.newContext({ storageState: state.getState });
  //   const page = await context.newPage();
  //   await use(page);
  // },

  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  PLP: async ({ page }, use) => {
    await use(new ProductListingPage(page));
  },

  PDP: async ({ page }, use) => {
    await use(new ProductDisplayPage(page));
  },

  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  orderConfirm: async ({ page }, use) => {
    await use(new OrderConirmPage(page));
  },
});

export { expect } from "@playwright/test";

import { expect } from "@playwright/test";
import { Locator, Page } from "playwright";
import { extractNumberFromElement } from "../utils/extractNumberFromElement/extractNumberFromElement";

type CartLocators = {
  cartTitleText: Locator;
  cartItemName: Locator;
  cartSubtotal: Locator;
  cartCheckoutButton: Locator;
};

export class CartPage {
  private page: Page;

  readonly cartPageLocators: CartLocators;

  constructor(page: Page) {
    this.page = page;

    this.cartPageLocators = {
      cartTitleText: page.locator("[data-cart-page-title]"),
      cartItemName: page.locator("a.cart-item-name__label"),
      cartSubtotal: page.locator(".cart-total-value > span >> nth=0"),
      cartCheckoutButton: page.locator("[data-primary-checkout-now-action]"),
    };
  }

  async assertNavigationToCartPage(itemQuantity) {
    const cartPageTitle =
      await this.cartPageLocators.cartTitleText.textContent();

    expect(cartPageTitle?.trim()).toBe(`Your Cart (${itemQuantity} items)`);
  }

  async assertProductIsPresentInCart(itemName) {
    const cartPageItemName =
      await this.cartPageLocators.cartItemName.textContent();
    expect(cartPageItemName).toBe(itemName);
  }

  async assertSubtotalValueisCorrect(subtotal) {
    const cartSubtotal = await extractNumberFromElement(
      this.cartPageLocators.cartSubtotal
    );

    expect(cartSubtotal).toEqual(subtotal);
  }

  async clickOnCheckoutButton() {
    await this.cartPageLocators.cartCheckoutButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

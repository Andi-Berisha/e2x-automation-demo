import { expect } from "@playwright/test";
import { Locator, Page } from "playwright";
import { extractNumberFromElement } from "../utils/extractNumberFromElement/extractNumberFromElement";

type PDPLocators = {
  productViewClass: Locator;
  productTitleText: Locator;
  increaseQtyButton: Locator;
  addToCartButton: Locator;
  itemPriceText: Locator;
  itemQty: Locator;
  subtotalText: Locator;
  viewCartButton: Locator;
};

export class ProductDisplayPage {
  private page: Page;

  readonly PDPLocators: PDPLocators;

  constructor(page: Page) {
    this.page = page;

    this.PDPLocators = {
      productViewClass: page.locator(".productView"),
      productTitleText: page.locator(".productView-title"),
      increaseQtyButton: page.locator("[data-action='inc']"),
      addToCartButton: page.locator("#form-action-addToCart"),
      itemPriceText: page.locator("[data-product-price-without-tax] >> nth=0"),
      itemQty: page.locator("p[data-cart-quantity]"),
      subtotalText: page.locator(".previewCartCheckout-price"),
      viewCartButton: page.getByRole("link", {
        name: "View or edit your cart",
      }),
    };
  }

  async assertNavigationToProductPage() {
    await expect(this.PDPLocators.productViewClass).toHaveCount(1);
    await expect(this.PDPLocators.productViewClass).toBeVisible();
  }

  // Increases the quantity of item by a specified amount.
  async increaseItemQuantityOf(incrementAmount: number) {
    for (let i = 0; i < incrementAmount; i++) {
      // Click the increment quantity button
      await this.PDPLocators.increaseQtyButton.click();

      // small delay before next click
      await this.page.waitForTimeout(500);
    }
  }

  async clickAddToCart() {
    await this.PDPLocators.addToCartButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async storeItemData() {
    const itemName = await this.PDPLocators.productTitleText.textContent();

    const itemPrice = await extractNumberFromElement(
      this.PDPLocators.itemPriceText
    );

    const itemQty = await extractNumberFromElement(this.PDPLocators.itemQty);

    const subtotal = await extractNumberFromElement(
      this.PDPLocators.subtotalText
    );

    const itemData = {
      itemName: itemName,
      itemPrice: itemPrice,
      itemQty: itemQty,
      subtotal: subtotal,
    };

    expect(subtotal).toEqual(itemQty * itemPrice);

    console.log("Table Name: Item Data");
    console.table(itemData);
    return itemData;
  }

  async clickOnViewCartButton() {
    await this.PDPLocators.viewCartButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

import { Locator, Page } from "playwright";
import { expect } from "@playwright/test";
import { extractNumberFromElement } from "../utils/extractNumberFromElement/extractNumberFromElement";

type OrderConfirmLocators = {
  orderConfrimHeading: Locator;
  orderConfirmNumber: Locator;
  orderSummaryItemName: Locator;
  OrderSummarySubtotal;
  orderSummaryShippingCost: Locator;
  orderSummaryTaxCost: Locator;
  orderSummaryTotal: Locator;
};

export class OrderConirmPage {
  private page: Page;

  readonly orderConfirmLocators: OrderConfirmLocators;

  constructor(page: Page) {
    this.page = page;

    this.orderConfirmLocators = {
      orderConfrimHeading: page.locator(
        "[data-test='order-confirmation-heading']"
      ),
      orderConfirmNumber: page.locator(
        "[data-test='order-confirmation-order-number-text']"
      ),
      orderSummaryItemName: page.locator(
        "[data-test='cart-item-product-title']"
      ),
      OrderSummarySubtotal: page.locator(
        "[data-test='cart-price-value'] >>nth=0"
      ),
      orderSummaryShippingCost: page.locator(
        "[data-test='cart-price-value'] >>nth=1"
      ),
      orderSummaryTaxCost: page.locator(
        "[data-test='cart-price-value'] >>nth=2"
      ),
      orderSummaryTotal: page.locator("[data-test='cart-price-value'] >>nth=3"),
    };
  }

  async assertOrderConfirmHeaderAndNumber(firstName: string) {
    const orderHeading =
      await this.orderConfirmLocators.orderConfrimHeading.textContent();
    const orderNumberText =
      await this.orderConfirmLocators.orderConfirmNumber.textContent();

    expect(orderHeading).toBe(`Thank you ${firstName}!`);
    expect(orderNumberText).toContain("Your order number is");
  }

  async assertOrderConfirmSummary(
    itemName,
    subtotal: number,
    shippingCost: number,
    taxCost: number
  ) {
    expect(itemName).toEqual(
      await this.orderConfirmLocators.orderSummaryItemName.textContent()
    );
    expect(subtotal).toEqual(
      await extractNumberFromElement(
        this.orderConfirmLocators.OrderSummarySubtotal
      )
    );
    expect(shippingCost).toEqual(
      await extractNumberFromElement(
        this.orderConfirmLocators.orderSummaryShippingCost
      )
    );
    expect(taxCost).toEqual(
      await extractNumberFromElement(
        this.orderConfirmLocators.orderSummaryTaxCost
      )
    );
    expect(subtotal + shippingCost + taxCost).toEqual(
      await extractNumberFromElement(
        this.orderConfirmLocators.orderSummaryTotal
      )
    );
  }
}

import { Locator, Page } from "playwright";
import { expect } from "@playwright/test";
import { createRandomUser } from "../utils/userCredentialsGenerator/userCredentialsGenerator";
import { extractNumberFromElement } from "../utils/extractNumberFromElement/extractNumberFromElement";
import { stateNameToCode } from "../utils/stateNameToCode/stateNameToCode";

type CheckoutLocators = {
  emailInput: Locator;
  privacyCheckbox: Locator;
  customerSectionContinueButton: Locator;

  countryInput: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  addressLine1Input: Locator;
  addressLine2Input: Locator;
  cityInput: Locator;
  stateInput: Locator;
  postalCodeInput: Locator;
  phoneNumberInput: Locator;
  shippingOptionPriceText: Locator;
  shippingSectionContinueButton: Locator;

  checkoutItemText: Locator;
  checkoutSubtotalText: Locator;
  checkoutShippingCostText: Locator;
  checkoutTaxCostText: Locator;
  checkoutTotalText: Locator;
  cardNumberInput: Locator;
  cardExpiryInput: Locator;
  cardNameInput: Locator;
  cardCvvInput: Locator;
  paymentSectionPlaceOrderButton: Locator;
};

export class CheckoutPage {
  private page: Page;
  private user: ReturnType<typeof createRandomUser>;

  readonly checkoutPageLocators: CheckoutLocators;

  constructor(page: Page) {
    this.page = page;
    this.user = createRandomUser();

    this.checkoutPageLocators = {
      //Customer Section Locators
      emailInput: page.locator("#email"),
      privacyCheckbox: page.locator("#privacyPolicy"),
      customerSectionContinueButton: page.locator(
        "#checkout-customer-continue"
      ),

      //Shipping Section Locators
      countryInput: page.locator("[data-test='countryCodeInput-select']"),
      firstNameInput: page.locator("[data-test='firstNameInput-text']"),
      lastNameInput: page.locator("[data-test='lastNameInput-text']"),
      addressLine1Input: page.locator("[data-test='addressLine1Input-text']"),
      addressLine2Input: page.locator("[data-test='addressLine2Input-text']"),
      cityInput: page.locator("[data-test='cityInput-text']"),
      stateInput: page.locator("[data-test='provinceCodeInput-select']"),
      postalCodeInput: page.locator("[data-test='postCodeInput-text']"),
      phoneNumberInput: page.locator("[data-test='phoneInput-text']"),
      shippingOptionPriceText: page.locator(".shippingOption-price"),
      shippingSectionContinueButton: page.locator(
        "#checkout-shipping-continue"
      ),

      //Payment and Order Summary Locators
      checkoutItemText: page.locator("[data-test='cart-item-product-title']"),
      checkoutSubtotalText: page.locator(
        "[data-test='cart-price-value'] >>nth=0"
      ),
      checkoutShippingCostText: page.locator(
        "[data-test='cart-price-value'] >>nth=1"
      ),
      checkoutTaxCostText: page.locator(
        "[data-test='cart-price-value'] >>nth=2"
      ),
      checkoutTotalText: page.locator("[data-test='cart-price-value'] >>nth=3"),
      cardNumberInput: page.locator("#ccNumber"),
      cardExpiryInput: page.locator("#ccExpiry"),
      cardNameInput: page.locator("#ccName"),
      cardCvvInput: page.locator("#ccCvv"),
      paymentSectionPlaceOrderButton: page.locator(
        "#checkout-payment-continue"
      ),
    };
  }

  async assertNavigationToCheckoutPage() {
    const currentPage = this.page.url();
    expect(currentPage).toBe(
      "https://cornerstone-light-demo.mybigcommerce.com/checkout"
    );
  }

  async fillCustomerInfoContinue() {
    await this.checkoutPageLocators.emailInput.type(this.user.email, {
      delay: 200,
    });
    await this.checkoutPageLocators.privacyCheckbox.check({ force: true });
    await this.checkoutPageLocators.customerSectionContinueButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async fillShippingInfoAndContinue() {
    await this.checkoutPageLocators.countryInput.selectOption({ value: "CA" });

    await this.checkoutPageLocators.firstNameInput.type(this.user.firstName, {
      delay: 200,
    });
    await this.checkoutPageLocators.lastNameInput.type(this.user.lastName, {
      delay: 200,
    });
    await this.checkoutPageLocators.addressLine1Input.type(
      this.user.address.line1,
      {
        delay: 200,
      }
    );
    await this.checkoutPageLocators.addressLine2Input.type(
      this.user.address.line2,
      {
        delay: 200,
      }
    );
    await this.checkoutPageLocators.cityInput.type(this.user.address.city, {
      delay: 200,
    });
    await this.checkoutPageLocators.stateInput.selectOption({
      value: `${stateNameToCode(this.user.address.state)}`,
    });
    await this.checkoutPageLocators.postalCodeInput.type(
      this.user.address.postcode,
      {
        delay: 200,
      }
    );
    await this.checkoutPageLocators.phoneNumberInput.type(
      this.user.phoneNumber,
      {
        delay: 200,
      }
    );
    await this.page.waitForLoadState("networkidle");
    await this.checkoutPageLocators.shippingSectionContinueButton.click();
  }

  async storeCheckoutSummaryData() {
    const checkoutItemName =
      await this.checkoutPageLocators.checkoutItemText.textContent();
    const checkoutSubtotal = await extractNumberFromElement(
      this.checkoutPageLocators.checkoutSubtotalText
    );
    const checkoutShippingCost = await extractNumberFromElement(
      this.checkoutPageLocators.checkoutShippingCostText
    );
    const checkoutTaxCost = await extractNumberFromElement(
      this.checkoutPageLocators.checkoutTaxCostText
    );

    const checkoutTotal = await extractNumberFromElement(
      this.checkoutPageLocators.checkoutTotalText
    );

    const checkoutData = {
      firstName: this.user.firstName,
      itemQtyName: checkoutItemName,
      subtotal: checkoutSubtotal,
      shippingCost: checkoutShippingCost,
      taxCost: checkoutTaxCost,
      total: checkoutTotal,
    };

    console.log("Table Name: Checkout Data");
    console.table(checkoutData);

    return checkoutData;
  }

  async assertCheckoutOrderSummaryIsCorrect(
    subtotal: number,
    shippingCost: number,
    taxCost: number,
    total: number
  ) {
    expect(subtotal + shippingCost + taxCost).toEqual(total);
  }

  async fillPaymentInfoAndSubmit() {
    await this.checkoutPageLocators.cardNumberInput.type(
      "4111 1111 1111 1111",
      {
        delay: 200,
      }
    );

    await this.checkoutPageLocators.cardExpiryInput.type("0527", {
      delay: 200,
    });
    await this.checkoutPageLocators.cardNameInput.type(
      `${this.user.firstName} ${this.user.lastName}`,
      {
        delay: 200,
      }
    );

    await this.checkoutPageLocators.cardCvvInput.type("729", {
      delay: 200,
    });

    await this.checkoutPageLocators.paymentSectionPlaceOrderButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

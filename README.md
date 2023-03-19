Playwright Framework Test Suite
This repository contains a Playwright framework that tests the checkout process for a fictional e-commerce website. The E2E Checkout Happy Path test suite performs an end-to-end checkout process by searching for a product, adding it to the cart, and completing the order.

Getting Started
To run this test suite, follow the steps below:

Clone the repository to your local machine.
Install the necessary dependencies by running npm install.
Run the tests by running npm test.
Test Description
The E2E Checkout Happy Path test suite includes the following steps:

Visit the website's home page and accept cookies.
Perform a search for "hand soap".
Navigate to the first search result's product page.
Increase the item quantity and add the product to the cart.
Store the item data and navigate to the cart page.
Verify that the product is present in the cart, the subtotal value is correct, and click on the checkout button.
Fill in the customer and shipping information, store the checkout summary data, and verify that the order summary is correct.
Fill in the payment information and submit the order.
Verify the order confirmation header and number, and verify the order summary data.
Test File
The E2E Checkout Happy Path test suite is defined in the test/checkout/checkoutHappyPath.test.ts file. The file imports the necessary fixtures and page objects and contains a single test case that performs the end-to-end checkout process.

typescript
Copy code
import { test, expect } from "../../../src/fixtures/test";
import { CartPage } from "../../../src/pages/cartPage";

test.describe("E2E Checkout Happy Path", () => {
  test("Search for hand soap, add item to cart and complete order", async ({
    home,
    PLP,
    PDP,
    cart,
    checkout,
    orderConfirm,
  }) => {
    await home.visitHomePageUrl();
    await home.acceptCookies();
    await home.clickQuickSearch();
    await home.enterSearchQuery("hand soap");
    await home.submitSearchQuery();

    await PLP.assertSearchQuerySuccessful();
    await PLP.clickOnFirstSearchResult();

    await PDP.assertNavigationToProductPage();
    await PDP.increaseItemQuantityOf(3);
    await PDP.clickAddToCart();
    const itemData = await PDP.storeItemData();
    await PDP.clickOnViewCartButton();

    await cart.assertNavigationToCartPage(itemData.itemQty);
    await cart.assertProductIsPresentInCart(itemData.itemName);
    await cart.assertSubtotalValueisCorrect(itemData.subtotal);
    await cart.clickOnCheckoutButton();

    await checkout.assertNavigationToCheckoutPage();
    await checkout.fillCustomerInfoContinue();
    await checkout.fillShippingInfoAndContinue();
    const checkoutData = await checkout.storeCheckoutSummaryData();
    await checkout.assertCheckoutOrderSummaryIsCorrect(
      checkoutData.subtotal,
      checkoutData.shippingCost,
      checkoutData.taxCost,
      checkoutData.total
    );
    await checkout.fillPaymentInfoAndSubmit();

    await orderConfirm.assertOrderConfirmHeaderAndNumber(
      checkoutData.firstName
    );
    await orderConfirm.assertOrderConfirmSummary(
      checkoutData.itemQtyName,
      checkoutData.subtotal,
      checkoutData.shippingCost,
      checkoutData.taxCost
    );
  });
});

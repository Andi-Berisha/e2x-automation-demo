import { test, expect } from "../../../src/fixtures/test";
import { CartPage } from "../../../src/pages/cartPage";

test.describe("E2E Checkout Happy Path", () => {
  test("Search for hand soap, add item to cart and complete order", async ({
    page,
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

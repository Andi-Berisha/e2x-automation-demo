import { expect } from "@playwright/test";
import { Locator, Page } from "playwright";
import { extractNumberFromElement } from "../utils/extractNumberFromElement/extractNumberFromElement";

type PLPLocators = {
  searchResultsHeader: Locator;
  firstResultLink: Locator;
};

export class ProductListingPage {
  private page: Page;

  readonly PLPLocators: PLPLocators;

  constructor(page: Page) {
    this.page = page;

    this.PLPLocators = {
      searchResultsHeader: page
        .locator("#search-results-heading")
        .locator(".page-heading"),
      firstResultLink: page.locator(".card-title >> nth=0"),
    };
  }

  async assertSearchQuerySuccessful() {
    try {
      const resultsFoundQty = await extractNumberFromElement(
        this.PLPLocators.searchResultsHeader
      );
      console.log(`${resultsFoundQty} items found for this product search.`);

      expect(resultsFoundQty).toBeGreaterThan(0);
    } catch (error) {
      throw new Error("No results have been found for this product search. ");
    }
  }

  async clickOnFirstSearchResult() {
    await this.PLPLocators.firstResultLink.click();
    await this.page.waitForLoadState("networkidle");
  }
}

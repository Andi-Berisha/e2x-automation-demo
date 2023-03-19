import { Locator, Page } from "playwright";
import { expect } from "@playwright/test";

type HomePageLocators = {
  acceptCookiesButton: Locator;
  quickSearchButton: Locator;
  quickSearchInput: Locator;
};

export class HomePage {
  private page: Page;

  readonly homePageLocators: HomePageLocators;

  constructor(page: Page) {
    this.page = page;

    this.homePageLocators = {
      acceptCookiesButton: page.locator(
        'button:has-text("Accept All Cookies")'
      ),
      quickSearchButton: page.locator("[data-search=quickSearch]"),
      quickSearchInput: page.locator("[data-search-quick]>>  nth= 0"),
    };
  }

  async visitHomePageUrl() {
    await this.page.goto("/", { waitUntil: "load" });
    const currentURL = this.page.url();
    expect(currentURL).toBe(
      "https://cornerstone-light-demo.mybigcommerce.com/"
    );
  }

  async acceptCookies() {
    await this.homePageLocators.acceptCookiesButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickQuickSearch() {
    await this.homePageLocators.quickSearchButton.click();
  }

  async enterSearchQuery(query) {
    await this.homePageLocators.quickSearchInput.type(query, {
      delay: 200,
    });
    await this.homePageLocators.quickSearchInput.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }

  async submitSearchQuery() {
    await this.homePageLocators.quickSearchInput.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }
}

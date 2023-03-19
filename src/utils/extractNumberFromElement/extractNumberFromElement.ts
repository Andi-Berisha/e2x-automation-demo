import { Locator } from "playwright";

export async function extractNumberFromElement(locator: Locator) {
  await locator.waitFor({ state: "visible" });
  const elementText = await locator.textContent();
  const priceString = elementText?.match(/\d+(\.\d+)?/)?.[0] ?? "";

  if (priceString === "") {
    throw new Error("Failed to find a number in the element locator provided.");
  }

  return parseFloat(priceString);
}

import { Locator } from "playwright";
import { extractNumberFromElement } from "./extractNumberFromElement";

// Mock the locator object and the textContent() function
const quantityLocator: Locator = {
  waitFor: jest.fn(),
  textContent: jest.fn().mockResolvedValue("12 items found"),
} as any as Locator;

const priceLocator: Locator = {
  waitFor: jest.fn(),
  textContent: jest.fn().mockResolvedValue("$16.99"),
} as any as Locator;

describe("extractNumberFromElement", () => {
  it("should extract a number from the given quantity element", async () => {
    const result = await extractNumberFromElement(quantityLocator);
    expect(result).toBe(12);
  });

  it("should extract a number from the given price element", async () => {
    const result = await extractNumberFromElement(priceLocator);
    expect(result).toBe(16.99);
  });

  it("should throw an error if no number is found", async () => {
    quantityLocator.textContent = jest.fn().mockResolvedValue("No items found");
    await expect(extractNumberFromElement(quantityLocator)).rejects.toThrow(
      "Failed to find a number in the element locator provided."
    );
  });
});

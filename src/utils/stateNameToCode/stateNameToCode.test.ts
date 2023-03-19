import { stateNameToCode } from "./stateNameToCode";

describe("stateNameToCode", () => {
  test("should return the correct code for a valid state name", () => {
    expect(stateNameToCode("Alberta")).toBe("AB");
    expect(stateNameToCode("British Columbia")).toBe("BC");
    expect(stateNameToCode("Manitoba")).toBe("MB");
    expect(stateNameToCode("New Brunswick")).toBe("NB");
    expect(stateNameToCode("Newfoundland and Labrador")).toBe("NL");
    expect(stateNameToCode("Northwest Territories")).toBe("NT");
    expect(stateNameToCode("Nova Scotia")).toBe("NS");
    expect(stateNameToCode("Nunavut")).toBe("NU");
    expect(stateNameToCode("Ontario")).toBe("ON");
    expect(stateNameToCode("Prince Edward Island")).toBe("PE");
    expect(stateNameToCode("Quebec")).toBe("QC");
    expect(stateNameToCode("Saskatchewan")).toBe("SK");
    expect(stateNameToCode("Yukon")).toBe("YT");
  });

  test("should throw an error if the input is not a state", () => {
    expect(() => stateNameToCode("LondonFake")).toThrowError(
      "State not found."
    );
  });
});

export function stateNameToCode(stateName: string) {
  const states = {
    Alberta: "AB",
    "British Columbia": "BC",
    Manitoba: "MB",
    "New Brunswick": "NB",
    "Newfoundland and Labrador": "NL",
    "Northwest Territories": "NT",
    "Nova Scotia": "NS",
    Nunavut: "NU",
    Ontario: "ON",
    "Prince Edward Island": "PE",
    Quebec: "QC",
    Saskatchewan: "SK",
    Yukon: "YT",
  };

  const stateCode = states[stateName];
  if (!stateCode) {
    throw new Error("State not found.");
  }

  return stateCode;
}

import { createRandomUser } from "./userCredentialsGenerator";

describe("createRandomUser", () => {
  test("should return a User object with valid properties", () => {
    const user = createRandomUser();

    expect(user).toBeDefined();
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("firstName");
    expect(user).toHaveProperty("lastName");
    expect(user).toHaveProperty("phoneNumber");
    expect(user).toHaveProperty("address");
    expect(user.email).toContain("@");
    expect(user.phoneNumber).toMatch(/^\d{11}$/);
    expect(user.address.postcode).toMatch(
      /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/
    );
  });

  test("should generate unique email addresses for each user", () => {
    const user1 = createRandomUser();
    const user2 = createRandomUser();

    expect(user1.email).not.toBe(user2.email);
  });
});

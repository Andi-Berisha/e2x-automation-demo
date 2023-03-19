import { faker } from "@faker-js/faker/locale/en_CA";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postcode: string;
  };
};

export function createRandomUser(): User {
  faker.locale = "en_CA";
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);

  return {
    firstName,
    lastName,
    email,
    phoneNumber: faker.phone.number("###########"),

    address: {
      line1: `${faker.address.buildingNumber()} ${faker.address.street()}`,
      line2: faker.address.secondaryAddress(),
      city: faker.address.cityName(),
      state: faker.address.state(),
      postcode: faker.address.zipCode(),
    },
  };
}

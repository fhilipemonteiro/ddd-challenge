import Address from "./address";

describe("Address unit tests", () => {
  test("should throw error when street is empty", () => {
    expect(() => {
      new Address("", 123, "12345", "City");
    }).toThrow("Street is required");
  });

  test("should throw error when number is empty", () => {
    expect(() => {
      new Address("Street", 0, "12345", "City");
    }).toThrow("Number is required");
  });

  test("should throw error when zip is empty", () => {
    expect(() => {
      new Address("Street", 123, "", "City");
    }).toThrow("Zip is required");
  });

  test("should throw error when city is empty", () => {
    expect(() => {
      new Address("Street", 123, "12345", "");
    }).toThrow("City is required");
  });

  test("should return formatted address string", () => {
    const address = new Address("Street", 123, "12345", "City");
    expect(address.toString()).toBe("Street 123 12345 City");
  });
});

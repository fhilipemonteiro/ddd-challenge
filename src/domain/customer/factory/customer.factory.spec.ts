import Address from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe("Customer factory unit test", () => {
  test("should create a customer", () => {
    const customer = CustomerFactory.create("Customer 1");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.Address).toBeUndefined();
  });

  test("sloud create a customer with an address", () => {
    const address = new Address("Street 1", 2, "65760-000", "São Paulo");
    const customer = CustomerFactory.createWithAddress("Customer 1", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.Address).toBe(address);
  });
});

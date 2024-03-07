import Customer from "./customer";
import Address from "../value-object/address";

describe("Customer unit tests", () => {
  test("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "Jhon");
    }).toThrow("Id is required");
  });

  test("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("Name is required");
  });

  test("should throw error when change name is empty", () => {
    const customer = new Customer("123", "Jhon");
    expect(() => {
      customer.changeName("");
    }).toThrow("Name is required");
  });

  test("should change name", () => {
    const customer = new Customer("123", "Jhon");
    customer.changeName("Smith");
    expect(customer.name).toBe("Smith");
  });

  test("should throw error when activate if customer not has Address", () => {
    const customer = new Customer("123", "Jhon");
    expect(() => {
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  test("should activate customer", () => {
    const customer = new Customer("123", "Jhon");
    const address = new Address("Rua 1", 12, "65760-000", "São Paulo");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  test("should deactivate customer", () => {
    const customer = new Customer("123", "Jhon");
    const address = new Address("Rua 1", 12, "65760-000", "São Paulo");
    customer.Address = address;
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  test("should add reward points", () => {
    const customer = new Customer("123", "Jhon");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});

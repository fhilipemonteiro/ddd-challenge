import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("should create a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: `${customer.id}` },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  test("should update a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.Address = address;

    await customerRepository.create(customer);

    const newAddress = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.changeName("Customer 2");

    customer.changeAddress(newAddress);

    customer.activate();

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: `${customer.id}` },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: "Customer 2",
      street: newAddress.street,
      number: newAddress.number,
      zip: newAddress.zip,
      city: newAddress.city,
      active: true,
      rewardPoints: customer.rewardPoints,
    });
  });

  test("should find a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(`${customer.id}`);

    expect(customerResult).toStrictEqual(customer);
  });

  test("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer.Address = address;

    await customerRepository.create(customer);

    expect(async () => {
      await customerRepository.find("1234");
    }).rejects.toThrow("Customer not found");
  });

  test("should find all customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("123", "Customer 1");
    const customer2 = new Customer("124", "Customer 2");

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

    customer1.Address = address;
    customer2.Address = address;

    const customers = [customer1, customer2];

    customers.forEach(async (customer) => {
      await customerRepository.create(customer);
    });

    const customerResult = await customerRepository.findAll();

    expect(customerResult).toStrictEqual(customers);
  });
});

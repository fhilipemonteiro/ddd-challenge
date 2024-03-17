import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";

export class CustomerFactory {
  public static create(name: string): Customer {
    const user = new Customer(uuid(), name);
    return user;
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.Address = address;

    return customer;
  }
}

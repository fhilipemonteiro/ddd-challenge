import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendMessageWhenCustomerIsCreated from "../event/handler/send-message-when-customer-is-created.event";
import CustomerCreatedEvent from "../event/customer-created.event";

export class CustomerFactory {
  public static create(name: string): Customer {
    const user = new Customer(uuid(), name);

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerIsCreated();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    const message1 = new CustomerCreatedEvent(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
    const message2 = new CustomerCreatedEvent(
      "Esse é o segundo console.log do evento: CustomerCreated"
    );
    eventDispatcher.notify("CustomerCreatedEvent", [message1, message2]);

    return user;
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.Address = address;

    return customer;
  }
}

import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerCreatedEvent from "./customer-created.event";
import SendMessageWhenAddressChanged from "./handler/send-message-when-address-is-changed.event";
import SendMessageWhenCustomerIsCreated from "./handler/send-message-when-customer-is-created.event";

describe("Customer events tests", () => {
  test("should print console.log when customer is created", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new SendMessageWhenCustomerIsCreated();
    const eventHandler2 = new SendMessageWhenCustomerIsCreated();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("EnviaConsoleLog1Handler", eventHandler1);
    eventDispatcher.register("EnviaConsoleLog2Handler", eventHandler2);

    const event1 = new CustomerCreatedEvent(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
    const event2 = new CustomerCreatedEvent(
      "Esse é o segundo console.log do evento: CustomerCreated"
    );

    eventDispatcher.notify("EnviaConsoleLog1Handler", [event1]);
    eventDispatcher.notify("EnviaConsoleLog2Handler", [event2]);

    expect(spyEventHandler1).toHaveBeenCalledTimes(1);
    expect(spyEventHandler2).toHaveBeenCalledTimes(1);
  });

  test("should print console.log when customer changed address", () => {
    const customer = new Customer("123", "Customer");
    const address = new Address("Street Address", 60, "65760-000", "SP");
    customer.Address = address;

    const newAddress = new Address("Strreet 01", 1, "00000-000", "SP");

    customer.changeAddress(newAddress);

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenAddressChanged();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    const event = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
      endereco: newAddress.toString(),
    });

    eventDispatcher.notify("CustomerCreatedEvent", [event]);

    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});

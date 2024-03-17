import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendMessageWhenCustomerIsCreated from "./handler/send-message-when-customer-is-created.event";

describe("Customer events tests", () => {
  test("should print console.log", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerIsCreated();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    const event1 = new CustomerCreatedEvent(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
    const event2 = new CustomerCreatedEvent(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );

    eventDispatcher.notify("CustomerCreatedEvent", [event1, event2]);
  });
});

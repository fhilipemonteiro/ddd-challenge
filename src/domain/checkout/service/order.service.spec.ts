import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  test("should place an order", () => {
    const customer = new Customer("c1", "Customer 1");

    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(100);
    expect(order.total()).toBe(200);
  });

  test("should get total of all orders", () => {
    const item1 = new OrderItem("i1", "Item 1 ", 100, "p1", 4);
    const item2 = new OrderItem("i2", "Item 2", 100, "p2", 2);

    const order1 = new Order("o1", "123", [item1]);
    const order2 = new Order("o2", "123", [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(600);
  });
});

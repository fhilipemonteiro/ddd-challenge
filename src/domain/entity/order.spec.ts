import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  test("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrow("Id is required");
  });

  test("should throw error when customerID is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrow("CustomerID is required");
  });

  test("should throw error when items is empty", () => {
    expect(() => {
      new Order("123", "123", []);
    }).toThrow("Items are required");
  });

  test("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("2", "Item 2", 150, "p2", 2);
    const order = new Order("123", "123", [item1, item2]);
    const total = order.total();
    expect(total).toBe(500);
  });

  test("should throw error if the item quantity is less or equal to zero", () => {
    expect(() => {
      const item1 = new OrderItem("1", "Item 1", 100, "p1", 0);
      new Order("123", "123", [item1]);
    }).toThrow("Quantity must be greater than 0");
  });
});

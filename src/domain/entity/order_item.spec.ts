import OrderItem from "./order_item";

describe("OrderItem unit tests", () => {
  test("should throw error when id is empty", () => {
    expect(() => {
      new OrderItem("", "Item 1", 100, "p1", 2);
    }).toThrow("Id is required");
  });

  test("should throw error when name is empty", () => {
    expect(() => {
      new OrderItem("123", "", 100, "p1", 2);
    }).toThrow("Name is required");
  });

  test("should throw error when price is less or equal to zero ", () => {
    expect(() => {
      new OrderItem("123", "Item 1", 0, "p1", 2);
    }).toThrow("Price must be greater than 0");
  });

  test("should throw error when productId is empty ", () => {
    expect(() => {
      new OrderItem("123", "Item 1", 100, "", 2);
    }).toThrow("ProductId is required");
  });

  test("should throw error when quantity is less or equal to zero", () => {
    expect(() => {
      new OrderItem("123", "Item 1", 100, "p1", 0);
    }).toThrow("Quantity must be greater than 0");
  });
});

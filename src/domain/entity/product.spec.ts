import Product from "./product";

describe("Product unit tests", () => {
  test("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Item 1", 100);
    }).toThrow("Id is required");
  });

  test("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrow("Name is required");
  });

  test("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "Item 1", -1);
    }).toThrow("Price must be greater than zero");
  });

  test("should change name", () => {
    const product = new Product("123", "Item 1", 10);
    product.changeName("Item 2");
    expect(product.name).toBe("Item 2");
  });

  test("should change price", () => {
    const product = new Product("123", "Item 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});

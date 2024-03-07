import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product Service unit tests", () => {
  test("should change the prices of the all products", () => {
    const product1 = new Product("1000", "Product 1", 100);
    const product2 = new Product("1001", "Product 2", 200);

    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(200);
    expect(product2.price).toBe(400);
  });
});

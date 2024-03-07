import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRespository from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("should create a product", async () => {
    const productRepository = new ProductRespository();

    const product = new Product("1", "Item 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });
    productModel;

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Item 1",
      price: 100,
    });
  });

  test("should update a product", async () => {
    const productRepository = new ProductRespository();

    const product = new Product("1", "Item 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Item 1",
      price: 100,
    });

    product.changeName("Item 101");
    product.changePrice(150);

    await productRepository.update(product);

    const updatedProductModel = await ProductModel.findOne({
      where: { id: "1" },
    });

    expect(updatedProductModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Item 101",
      price: 150,
    });
  });

  test("should find a product", async () => {
    const productRepository = new ProductRespository();

    const product = new Product("1", "Item 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    const foundProduct = await productRepository.find("1");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  test("should find all products", async () => {
    const productRepository = new ProductRespository();

    const product1 = new Product("1", "Item 1", 100);
    const product2 = new Product("2", "Item 2", 200);

    const products = [product1, product2];

    products.map(async (product) => {
      await productRepository.create(product);
    });

    const foundProducts = await productRepository.findAll();

    expect(foundProducts).toEqual(products);
  });
});

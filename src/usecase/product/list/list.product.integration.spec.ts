import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test list product use case", () => {

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

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    const product1 = new Product('1', 'product 1', 15);
    await productRepository.create(product1);
    const product2 = new Product('2', 'product 2', 17);
    await productRepository.create(product2);

    const products = [product1, product2];

    const output = await listProductUseCase.execute({});

    expect(output.products.length).toEqual(products.length);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const productExpected = output.products[i];

      expect(product.name).toEqual(productExpected.name)
      expect(product.price).toEqual(productExpected.price)

    }
  })

})
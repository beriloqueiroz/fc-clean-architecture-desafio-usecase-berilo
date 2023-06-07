import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductUpdateUseCase from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const input = {
  id: "1",
  name: "Product 2",
  price: 10
}

describe("Integration test for product update use case", () => {
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

  it("should update a customer", async () => {
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new ProductUpdateUseCase(productRepository);

    const product1 = new Product('1', 'product 1', 15);
    await productRepository.create(product1);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});

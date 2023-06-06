import Product from "../../../domain/product/entity/product";
import ProductUpdateUseCase from "./update.product.usecase";

const input = {
  id: "123450",
  name: "Product 2",
  price: 10
}

const product = new Product("123450", "Product 1", 16);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a customer", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new ProductUpdateUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});

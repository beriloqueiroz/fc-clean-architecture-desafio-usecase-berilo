import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./list.product.usecase";

const products = [ProductFactory.create("a", "Product 1", 15), ProductFactory.create("b", "Product 2", 10)];

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit test list product use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new ListProductUseCase(productRepository);

    const output = await findProductUseCase.execute({});


    expect(output.products.length).toEqual(products.length);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const productExpected = output.products[i];

      expect(product.name).toEqual(productExpected.name)
      expect(product.price).toEqual(productExpected.price)

    }
  })

})
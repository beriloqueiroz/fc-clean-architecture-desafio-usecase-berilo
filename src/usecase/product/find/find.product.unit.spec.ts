import ProductFactory from "../../../domain/product/factory/product.factory"
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product 1", 15);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const input = {
      id: product.id,
    }

    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const output = await findProductUseCase.execute(input);

    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })
  })


  it("should not found a product", async () => {
    const input = {
      id: "123",
    }
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    })
    const findProductUseCase = new FindProductUseCase(productRepository);

    expect(() => {
      return findProductUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  })
})
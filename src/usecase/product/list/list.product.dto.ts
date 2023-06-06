export interface ListProductInputDto {
}

type Product = {
  id: string,
  name: string,
  price: number,
}

export interface ListProductOutputDto {
  products: Product[]
}
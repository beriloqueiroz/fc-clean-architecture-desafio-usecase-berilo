export interface ListProductInputDto {
}

export interface ListProductOutputDto {
  products: {
    id: string,
    name: string,
    price: number,
  }[]
}
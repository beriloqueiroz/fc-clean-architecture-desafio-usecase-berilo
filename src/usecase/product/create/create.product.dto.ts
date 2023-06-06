export interface CreateProductInputDto {
  type: string,
  name: string,
  price: number,
}

export interface CreateProductOutputDto {
  id: string,
  name: string,
  price: number,
}
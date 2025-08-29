
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
}


export interface ProductResponse {
  products: Product[];
  limit: number;
  skip: number;
  total?: number;
}


export type AddProductDTO = Omit<Product, "id">; 
export type UpdateProductDTO = Partial<Product>; 

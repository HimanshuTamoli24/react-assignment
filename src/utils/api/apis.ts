import axios from "axios";
import { BASE_URL } from "@/constants/constant";
import {
  Product,
  ProductResponse,
  AddProductDTO,
  UpdateProductDTO,
} from "@/types/types";

// Get paginated products
export async function getProducts(
  limit = 10,
  skip = 0
): Promise<ProductResponse> {
  const res = await axios.get<ProductResponse>(BASE_URL, {
    params: { limit, skip },
  });
  return res.data;
}

// Add product
export async function addProduct(product: AddProductDTO): Promise<Product> {
  const res = await axios.post<Product>(`${BASE_URL}/add`, product, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

// Update product
export async function updateProduct(
  id: number,
  updates: UpdateProductDTO
): Promise<Product> {
  const res = await axios.put<Product>(`${BASE_URL}/${id}`, updates, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

// Delete product
export async function deleteProduct(
  id: number
): Promise<{ isDeleted: boolean; id: number }> {
  const res = await axios.delete<{ isDeleted: boolean; id: number }>(
    `${BASE_URL}/${id}`
  );
  return res.data;
}

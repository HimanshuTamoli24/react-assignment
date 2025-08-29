import axios from "axios";
import { BASE_URL } from "@/constants/constant";

export async function getProducts(limit = 10, skip = 0) {
  try {
    const res = await axios.get(BASE_URL, {
      params: { limit, skip },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}

export async function addProduct(product: any) {
  try {
    const res = await axios.post(`${BASE_URL}/add`, product, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to add product");
  }
}

export async function updateProduct(id: number, updates: any) {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updates, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: number) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete product");
  }
}

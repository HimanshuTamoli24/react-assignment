import { create } from "zustand";
import { Product, ProductResponse } from "@/types/types";

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
}
    
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));

// types/product.ts
interface Product {
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

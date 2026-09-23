import api from "../lib/axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string[];
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>("/products");

  return response.data;
};
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

export const getProducts = async (
  limit = 10,
  skip = 0
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    `/products?limit=${limit}&skip=${skip}`
  );

  return response.data;
};
export const getProductById = async (
  id: string
): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);

  return response.data;
};
export const updateProduct = async (
  id: string,
  data: {
    title: string;
    price: number;
    description: string;
  }
): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, data);

  return response.data;
};
export const getProductsByCategory = async (
  category: string,
  limit = 10,
  skip = 0
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
  );

  return response.data;
};
export const getSortedProducts = async (
  sortBy: "price" | "rating" | "title",
  limit = 10,
  skip = 0
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    `/products?sortBy=${sortBy}&order=asc&limit=${limit}&skip=${skip}`
  );

  return response.data;
};
       
export const searchProducts = async (
  query: string,
  limit = 10,
  skip = 0
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  );

  return response.data;
};
export const getCategories = async (): Promise<
  { slug: string; name: string; url: string }[]
> => {
  const response = await api.get<
    { slug: string; name: string; url: string }[]
  >("/products/categories");

  return response.data;
};
import authApi from '@/lib/axios';
import { IProductResponse, IProductsResponse, CreateProductData, UpdateProductData } from './_modals';

const PRODUCTS_URL = '/products';

export function getAllProducts(params?: Record<string, any>) {
  return authApi.get<IProductsResponse>(PRODUCTS_URL, { params });
}

export function getSpecificProduct(id: string) {
  return authApi.get<IProductResponse>(`${PRODUCTS_URL}/${id}`);
}

export function createProduct(body: CreateProductData) {
  return authApi.post<IProductResponse>(PRODUCTS_URL, body);
}

export function updateProduct(id: string, body: UpdateProductData) {
  return authApi.patch<IProductResponse>(`${PRODUCTS_URL}/${id}`, body);
}

export function deleteProduct(id: string) {
  return authApi.delete<{ message: string }>(`${PRODUCTS_URL}/${id}`);
}

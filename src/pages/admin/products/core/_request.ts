import authApi from '@/lib/axios';
import { IProductResponse, IProductsResponse, CreateProductData, UpdateProductData, ProductQueryParams, IProductModel,
  ISupplierResponse,
  ISuppliersResponse,
  CreateSupplierData,
  UpdateSupplierData,
  SupplierQueryParams,
  ISupplier,
  SavedFilter } from './_modals';

const PRODUCTS_URL = '/products';
const SUPPLIERS_URL = "/suppliers"
const FILTERS_URL = '/saved-filters';
const PRODUCT_FILTERS_URL = '/saved-filters/product';

export function getAllProducts(params?: ProductQueryParams) {
  return authApi.get<IProductsResponse>(PRODUCTS_URL, { params });
}

export function getSpecificProduct(id: string) {
  return authApi.get<IProductModel>(`${PRODUCTS_URL}/${id}`);
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


// supplier ===============================

export function getAllSuppliers(params?: SupplierQueryParams) {
  return authApi.get<ISuppliersResponse>(SUPPLIERS_URL, { params })
}

export function getSpecificSupplier(id: string) {
  return authApi.get<ISupplier>(`${SUPPLIERS_URL}/${id}`)
}

export function createSupplier(body: CreateSupplierData) {
  return authApi.post<ISupplierResponse>(SUPPLIERS_URL, body)
}

export function updateSupplier(id: string, body: UpdateSupplierData) {
  return authApi.patch<ISupplierResponse>(`${SUPPLIERS_URL}/${id}`, body)
}

export function deleteSupplier(id: string) {
  return authApi.delete<{ message: string }>(`${SUPPLIERS_URL}/${id}`)
}

export function saveProductFilter(filter: SavedFilter) {
  return authApi.post<{ message: string; data: SavedFilter }>(FILTERS_URL, filter);
}

export function getProductFilters() {
  return authApi.get<{ data: SavedFilter[] }>(PRODUCT_FILTERS_URL);
}

export function deleteProductFilter(id: string) {
  return authApi.delete<{ message: string }>(`${FILTERS_URL}/${id}`);
}

export function updateProductFilter(id: string, filter: Partial<SavedFilter>) {
  return authApi.patch<{ message: string; data: SavedFilter }>(`${FILTERS_URL}/${id}`, filter);
}

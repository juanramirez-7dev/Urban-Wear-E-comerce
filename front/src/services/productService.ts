import type { ProductPagedResponse, Params, ProductDetails } from "../types/productTypes"
import { BASE_API_URL } from "../config/api"

export const getProducts = async ({ limit, offset, categoriaId , min, max } : Params) : Promise<ProductPagedResponse> => {
  const url = buildUrl(`${BASE_API_URL}/Productos`, { limit, offset, categoriaId, min, max });

  const response = await fetch(url);
  const data : ProductPagedResponse = await response.json();

  return data;
}

export const getProductDetails = async (id: string) : Promise<ProductDetails> => {

  const response = await fetch(`${BASE_API_URL}/Productos/${id}`);

  const data : ProductDetails = await response.json();

  return data;

}

const buildUrl = (baseUrl: string, params:Params) => {
  const query = new URLSearchParams();

  if (params.limit != null) query.append("limit", String(params.limit));
  if (params.offset != null) query.append("offset", String(params.offset));
  if (params.categoriaId != null) query.append("categoriaId", String(params.categoriaId));
  if (params.min != null) query.append("min", String(params.min));
  if (params.max != null) query.append("max", String(params.max));

  const queryString = query.toString();

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
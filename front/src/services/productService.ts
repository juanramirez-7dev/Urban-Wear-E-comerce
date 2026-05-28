import type { ProductPagedResponse, Params, ProductDetails } from "../types/productTypes"
import type { ErrorResponseType } from "../types/genericTypes"
import { BASE_API_URL } from "../config/api"

export const getProducts = async ({ limit, offset, categoriaId , min, max } : Params) : Promise<ProductPagedResponse> => {
  const url = buildUrl(`${BASE_API_URL}/Productos`, { limit, offset, categoriaId, min, max });

  const response = await fetch(url);
  console.log("URL de la solicitud:", url); // Agrega este log para verificar la URL
  const data : ProductPagedResponse = await response.json();

  return data;
}

export const getProductDetails = async (id: string) : Promise<ProductDetails> => {

  const response = await fetch(`${BASE_API_URL}/Productos/${id}`);

  const data : ProductDetails = await response.json();

  return data;

}

export const deleteProduct = async (id: string, token?: string | null) : Promise<void> => {
  const resolvedToken = token ?? getStoredToken()
  const response = await fetch(`${BASE_API_URL}/Productos/${id}`, {
    method: "DELETE",
    headers: resolvedToken ? { Authorization: `Bearer ${resolvedToken}` } : undefined
  })

  if (!response.ok) {
    let errorMessage = "No pudimos eliminar el producto."

    try {
      const errorData = (await response.json()) as ErrorResponseType
      if (errorData?.message) {
        errorMessage = errorData.message
      }
    } catch {
      // Keep default error message on invalid response bodies.
    }

    throw new Error(errorMessage)
  }
}

export const createProduct = async (productData: FormData) : Promise<void> => {
    const token = getStoredToken()
    if (!token) {
      throw new Error("No autenticado. Por favor inicia sesión para crear un producto.")
    }

    const response = await fetch(`${BASE_API_URL}/Productos`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: productData
    })

    if (!response.ok) {
      const errorData : ErrorResponseType = await response.json()
      throw new Error(errorData.message || "No se pudo crear el producto.")
    }

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

const getStoredToken = () => {
  const rawToken = localStorage.getItem("token")
  if (!rawToken) return null

  try {
    const parsed = JSON.parse(rawToken) as { token?: string }
    return parsed.token ?? null
  } catch {
    return null
  }
}
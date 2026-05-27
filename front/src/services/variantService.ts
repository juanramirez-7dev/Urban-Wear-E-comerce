import type { ErrorResponseType } from "../types/genericTypes"
import type { ProductoVariante } from "../types/productTypes"
import { BASE_API_URL } from "../config/api"

export const getProductVariants = async (
  productId: string,
  token?: string | null
): Promise<ProductoVariante[]> => {
  const response = await fetch(`${BASE_API_URL}/Producto/${productId}/Variante`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  })

  if (!response.ok) {
    throw new Error(await resolveErrorMessage(response))
  }

  return (await response.json()) as ProductoVariante[]
}

export const updateVariantStock = async (
  productId: string,
  variantId: string,
  stock: number,
  token?: string | null
): Promise<void> => {
  const response = await fetch(
    `${BASE_API_URL}/Producto/${productId}/Variante/${variantId}/Stock`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ stock })
    }
  )

  if (!response.ok) {
    throw new Error(await resolveErrorMessage(response))
  }
}

const resolveErrorMessage = async (response: Response) => {
  let errorMessage = "No pudimos procesar la solicitud."

  try {
    const data = (await response.json()) as ErrorResponseType
    if (data?.message) {
      errorMessage = data.message
    }
  } catch {
    // Keep default error message when response is not JSON.
  }

  return errorMessage
}

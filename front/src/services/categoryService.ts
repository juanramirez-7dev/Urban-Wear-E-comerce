import type { Category } from "../types/categoryTypes";
import { BASE_API_URL } from "../config/api";

type CategoryPayload = {
  nombre: string
}

type ErrorResponse = {
  message?: string
}

export const getCategories = async (token?: string | null): Promise<Category[]> => {
  const response = await fetch(`${BASE_API_URL}/Categorias`, {
    headers: buildAuthHeaders(token)
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "No pudimos cargar las categorias."))
  }

  const data: Category[] = await response.json()
  return data
}

export const createCategory = async (
  categoryData: CategoryPayload,
  token?: string | null
): Promise<Category> => {
  const response = await fetch(`${BASE_API_URL}/Categorias`, {
    method: "POST",
    headers: buildJsonHeaders(token),
    body: JSON.stringify(categoryData)
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "No pudimos crear la categoria."))
  }

  return response.json() as Promise<Category>
}

export const updateCategory = async (
  id: string,
  categoryData: CategoryPayload,
  token?: string | null
): Promise<Category> => {
  const response = await fetch(`${BASE_API_URL}/Categorias/${id}`, {
    method: "PUT",
    headers: buildJsonHeaders(token),
    body: JSON.stringify(categoryData)
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "No pudimos actualizar la categoria."))
  }

  return response.json() as Promise<Category>
}

export const deleteCategory = async (id: string, token?: string | null): Promise<void> => {
  const response = await fetch(`${BASE_API_URL}/Categorias/${id}`, {
    method: "DELETE",
    headers: buildAuthHeaders(token)
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "No pudimos eliminar la categoria."))
  }
}

const buildAuthHeaders = (token?: string | null) => {
  const resolvedToken = token ?? getStoredToken()

  return resolvedToken
    ? {
      Authorization: `Bearer ${resolvedToken}`
    }
    : undefined
}

const buildJsonHeaders = (token?: string | null) => ({
  ...(buildAuthHeaders(token) ?? {}),
  "Content-Type": "application/json"
})

const readErrorMessage = async (response: Response, fallbackMessage: string) => {
  try {
    const errorData = (await response.json()) as ErrorResponse
    return errorData.message ?? fallbackMessage
  } catch {
    return fallbackMessage
  }
}

const getStoredToken = () => {
  const rawToken = localStorage.getItem("token")

  if (!rawToken) {
    return null
  }

  try {
    const parsed = JSON.parse(rawToken) as { token?: string }
    return parsed.token ?? null
  } catch {
    return null
  }
}
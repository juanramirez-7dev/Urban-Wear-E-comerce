import type { Category } from "../types/categoryTypes";
import { BASE_API_URL } from "../config/api";

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_API_URL}/Categorias`)

  const data: Category[] = await response.json()
  return data
}
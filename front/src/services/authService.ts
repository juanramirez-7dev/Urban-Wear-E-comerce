import type { LoginRequestType, LoginResponseType, MeResponseType } from "../types/authTypes"
import type { ErrorResponseType } from "../types/genericTypes"
import type { User, RegisterUser } from "../types/userTypes"
import { BASE_API_URL } from "../config/api" 

export const login =  async (credential: LoginRequestType): Promise<LoginResponseType>  => {

  const response = await fetch(`${BASE_API_URL}/Authentication/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credential)
    })

    if (!response.ok) {
      const errorData: ErrorResponseType = await response.json()
      throw new Error(errorData.message || "Credenciales invalidas")
    }

    const data : LoginResponseType = await response.json()
      
    return data

}

export const me = async (token: string): Promise<MeResponseType> => {

  const response = await fetch(`${BASE_API_URL}/Authentication/me`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`
      },
    })

    if (!response.ok) {
      const errorData: ErrorResponseType = await response.json()
      throw new Error(errorData.message || "Error al obtener información del usuario")
    }

    const data : MeResponseType = await response.json()
      
    return data

}

export const register = async (user: RegisterUser): Promise<User> => {
  const response = await fetch(`${BASE_API_URL}/Usuario`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" ,
      },
      body: JSON.stringify(user)
    })

    if (!response.ok) {
      const errorData: ErrorResponseType = await response.json()
      throw new Error(errorData.message || "Error al obtener información del usuario")
    }

    const data : User = await response.json()
      
    return data
}




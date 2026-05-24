import type { LoginRequestType, LoginResponseType, ErrorResponseType, MeResponseType } from "../types/authTypes"

export const login =  async (credential: LoginRequestType): Promise<LoginResponseType>  => {

  const response = await fetch("/api/auth/login", {
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

  const response = await fetch("/api/auth/me", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" ,
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


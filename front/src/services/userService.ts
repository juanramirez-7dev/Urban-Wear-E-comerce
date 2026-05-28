import { BASE_API_URL } from "../config/api";
import type { ErrorResponseType } from "../types/genericTypes";
import type { UpdateUserProfileRequest, User } from "../types/userTypes";
import type { PedidoResponse } from "../types/orderTypes"; 

export const forgotPassword = async (email: string) : Promise<void> => {

  const response = await fetch(`${BASE_API_URL}/Usuario/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })  

  if (!response.ok) {
    const errorData : ErrorResponseType = await response.json();
    const errorMessage = errorData?.message || "No pudimos procesar tu solicitud de recuperación de contraseña.";
    throw new Error(errorMessage);
  }

}

export const verifyResetCode = async (resetCode: string, email: string) : Promise<{recoveryToken: string}> => {

  const response = await fetch(`${BASE_API_URL}/Usuario/verify-reset-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ resetCode, email })
  })
  
  if (!response.ok) {
    const errorData : ErrorResponseType = await response.json();
    const errorMessage = errorData?.message || "Código de recuperación inválido o expirado.";
    throw new Error(errorMessage);
  }

  const data : { recoveryToken: string } = await response.json();
  return data;

}

export const resetPassword = async (recoveryToken: string, newPassword: string) : Promise<void> => {

  const response = await fetch(`${BASE_API_URL}/Usuario/reset-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${recoveryToken}`
    },
    body: JSON.stringify({newPassword })
  })

  if (!response.ok) {
    const errorData : ErrorResponseType = await response.json();
    const errorMessage = errorData?.message || "No pudimos restablecer tu contraseña.";
    throw new Error(errorMessage);
  }
}


export const updatePassword = async (currentPassword: string, newPassword: string, token?: string | null) : Promise<void> => {
  const response = await fetch(`${BASE_API_URL}/Usuario/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  } )

   if (!response.ok) {
    const errorData : ErrorResponseType = await response.json();
    const errorMessage = errorData?.message || "No pudimos actualizar tu contraseña.";
    throw new Error(errorMessage);
  }
}

export const updateUserProfile = async (data: UpdateUserProfileRequest, userId : string, token?: string | null) : Promise<void> => {
  const response = await fetch(`${BASE_API_URL}/Usuario/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  } )

   if (!response.ok) {
    const errorData : ErrorResponseType = await response.json();
    const errorMessage = errorData?.message || "No pudimos actualizar tu contraseña.";
    throw new Error(errorMessage);
  }
}

export const getUserProfile = async (userId: string, token?: string | null) : Promise<User> => {
  const response = await fetch(`${BASE_API_URL}/Usuario/${userId}`, {
    headers: { "Authorization": `Bearer ${token}` } 
  })

  if (!response.ok) {
    const errorData : ErrorResponseType = await response.json();
    const errorMessage = errorData?.message || "No pudimos obtener tu información de perfil.";
    throw new Error(errorMessage);
  }

  const data : User = await response.json();
  return data;
}

export const getMyPedidos = async (token: string): Promise<PedidoResponse[]> =>  {
    const response = await fetch(`${BASE_API_URL}/Pedidos/my-orders`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

	 if (!response.ok) {
    const errorData : ErrorResponseType = await response.json();
    const errorMessage = errorData?.message || "No pudimos obtener tu información de perfil.";
    throw new Error(errorMessage);
  }

    const data: PedidoResponse[] = await response.json();
    return data
}
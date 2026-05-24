import { type ReactNode } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthContext } from "../context/AuthContext"
import { login, me } from "../services/authService"
import type { MeResponseType, LoginRequestType, LoginResponseType } from "../types/authTypes"

type AuthContextPropsType = {
  children: ReactNode
}

export function AuthProvider({ children } : AuthContextPropsType) {

  const queryClient = useQueryClient()

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string).token : null

  const { data: user = null, isLoading: isLoadingGetMe } = useQuery<MeResponseType | null >({
    queryKey: ["user"],
    queryFn: () => me(token),
    enabled: !!token,
  })


  const loginMutate = useMutation<LoginResponseType, Error, LoginRequestType>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", JSON.stringify(data))
    }
  })

  const logout = () => {
    localStorage.removeItem("token")
    queryClient.setQueryData(["user"], null)
  }


  return (
    <AuthContext.Provider value={{
      token,
      user,
      loginMutate,
      isLoadingGetMe,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )

}
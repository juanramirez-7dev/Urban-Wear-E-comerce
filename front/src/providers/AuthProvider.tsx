import { type ReactNode, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthContext } from "../context/AuthContext"
import { login, me, register } from "../services/authService"
import type { MeResponseType, LoginRequestType, LoginResponseType } from "../types/authTypes"
import type { User, RegisterUser } from "../types/userTypes"

type AuthContextPropsType = {
  children: ReactNode
}

export function AuthProvider({ children } : AuthContextPropsType) {

  const queryClient = useQueryClient()

  const [token, setToken] = useState<string | null>(() => {
    const rawToken = localStorage.getItem("token")
    return rawToken ? JSON.parse(rawToken).token : null
  })

  const { data: user = null, isLoading: isLoadingGetMe } = useQuery<MeResponseType | null >({
    queryKey: ["user", token],
    queryFn: () => me(token),
    enabled: !!token,
  })


  const loginMutate = useMutation<LoginResponseType, Error, LoginRequestType>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", JSON.stringify(data))
      setToken(data.token)
    }
  })


  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    queryClient.removeQueries({ queryKey: ["user"] })
  }

  const registerMutate = useMutation<User, Error, RegisterUser>({
    mutationFn: register,
  })

  return (
    <AuthContext.Provider value={{
      token,
      user,
      loginMutate,
      isLoadingGetMe,
      logout,
      registerMutate
    }}>
      {children}
    </AuthContext.Provider>
  )

}
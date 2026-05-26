import { createContext } from 'react'
import type { LoginRequestType, LoginResponseType, MeResponseType } from '../types/authTypes'
import { type UseMutationResult } from '@tanstack/react-query'
import type { User, RegisterUser } from '../types/userTypes'

type AuthContextType = {
  token: string | null,
  user: MeResponseType | null,
  loginMutate: UseMutationResult<LoginResponseType, Error, LoginRequestType>,
  isLoadingGetMe: boolean,
  logout: () => void,
  registerMutate: UseMutationResult<User, Error, RegisterUser>
}

export const AuthContext = createContext<AuthContextType | null>(null)

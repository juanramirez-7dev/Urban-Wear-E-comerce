import { createContext } from 'react'
import type { LoginRequestType, LoginResponseType, MeResponseType } from '../types/authTypes'
import { type UseMutationResult } from '@tanstack/react-query'

type AuthContextType = {
  token: string | null,
  user: MeResponseType | null,
  loginMutate: UseMutationResult<LoginResponseType, Error, LoginRequestType>,
  isLoadingGetMe: boolean,
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

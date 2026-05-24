type LoginRequestType = {
  email: string,
  password: string
}

type LoginResponseType = {
  token: string,
}

type MeResponseType = {
  id: string,
  email: string,
  name: string,
  role: string
}

type ErrorResponseType = {
  message: string
}

export type {
  LoginRequestType,
  LoginResponseType,
  MeResponseType,
  ErrorResponseType
}
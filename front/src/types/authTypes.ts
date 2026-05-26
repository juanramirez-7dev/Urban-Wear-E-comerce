type LoginRequestType = {
  email: string,
  password: string
}

type LoginResponseType = {
  token: string,
  rol: string
}

type MeResponseType = {
  id: string,
  email: string,
  name: string,
  role: string,
  telefono?: string
}


export type {
  LoginRequestType,
  LoginResponseType,
  MeResponseType,
}
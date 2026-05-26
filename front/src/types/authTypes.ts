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


export type {
  LoginRequestType,
  LoginResponseType,
  MeResponseType,
}
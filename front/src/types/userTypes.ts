interface User {
  id: string;
  nombre : string;
  email: string;
  telefono: string;
}

interface RegisterUser {
  nombre : string;
  email: string;
  telefono: string;
  password: string;
}

interface UpdateUserProfileRequest {
  nombre: string;
  email: string;
  telefono: string;
}

export type {
  User,
  RegisterUser,
  UpdateUserProfileRequest
}


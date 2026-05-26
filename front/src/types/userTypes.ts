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

export type {
  User,
  RegisterUser
}


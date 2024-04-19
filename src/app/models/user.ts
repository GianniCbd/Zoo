export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
  roles: Role[];
  favorites: [];
}

export interface Role {
  id: string;
  role: string;
}

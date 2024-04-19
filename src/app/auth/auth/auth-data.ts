export interface AuthData {
  accessToken: string;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    confimrPassword: string;
    image: string;
  };
}

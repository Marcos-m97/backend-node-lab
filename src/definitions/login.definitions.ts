export type LoginRequest = {
  email: string;
  password: string;
};

export type loginResponse = {
  accessToken: string;
  expiresIn: number;
};

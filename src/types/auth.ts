export interface Therapeute {
  id: string;
  email: string;
  nom: string;
  prenom: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  prenom: string;
  nom: string;
  email: string;
  role: "PATIENT" | "THERAPEUTE";
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
export interface AuthUser {
   id: number;
   username: string;
   email: string;
   role: string;
}

export interface LoginPayload {
   email: string;
   password: string;
}

export interface AuthResponse {
   token: string;
   user: AuthUser;
}

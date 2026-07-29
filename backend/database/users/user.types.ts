export type UserRole = "operator" | "admin";

export interface User {
   id: number;
   username: string;
   email: string;
   password: string;
   role: UserRole;
   createdAt: string;
}

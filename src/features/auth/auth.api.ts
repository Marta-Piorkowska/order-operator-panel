import type {
   AuthResponse,
   LoginPayload,
} from "./auth.types";

export const login = async (
   payload: LoginPayload,
): Promise<AuthResponse> => {
   const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
   });

   const data = await response.json();

   if (!response.ok) {
      throw new Error(
         data.message ?? "Nie udało się zalogować.",
      );
   }

   return data;
};

import type { AuthResponse } from "./auth.types";

const AUTH_STORAGE_KEY = "order-panel-auth";

export const saveAuth = (auth: AuthResponse): void => {
   localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(auth),
   );
};

export const getAuth = (): AuthResponse | null => {
   const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

   if (!storedAuth) {
      return null;
   }

   try {
      return JSON.parse(storedAuth) as AuthResponse;
   } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
   }
};

export const clearAuth = (): void => {
   localStorage.removeItem(AUTH_STORAGE_KEY);
};

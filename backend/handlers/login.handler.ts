import { http, HttpResponse } from "msw";
import { database } from "../database";

export const loginHandler = http.post(
   "/api/auth/login",
   async ({ request }) => {

      const body = (await request.json()) as {
         email: string;
         password: string;
      };

      const user = database.users.find(
         (currentUser) =>
            currentUser.email === body.email &&
            currentUser.password === body.password,
      );

      if (!user) {
         return HttpResponse.json(
            {
               message: "Nieprawidłowy adres e-mail lub hasło.",
            },
            {
               status: 401,
            },
         );
      }

      return HttpResponse.json({
         token: `mock-token-${user.id}`,
         user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
         },
      });
   },
);

import {
   createFileRoute,
   redirect,
} from "@tanstack/react-router";

import { getAuth } from "../features/auth/auth.storage";
import { LoginPage } from "../pages/LoginPage";

export const Route = createFileRoute("/login")({
   beforeLoad: () => {
      const auth = getAuth();

      if (auth) {
         throw redirect({
            to: "/orders",
         });
      }
   },
   component: LoginPage,
});

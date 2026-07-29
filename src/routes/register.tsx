import {
   createFileRoute,
   redirect,
} from "@tanstack/react-router";

import { getAuth } from "../features/auth/auth.storage";
import { RegisterPage } from "../pages/RegisterPage";

export const Route = createFileRoute("/register")({
   beforeLoad: () => {
      const auth = getAuth();

      if (auth) {
         throw redirect({
            to: "/orders",
         });
      }
   },
   component: RegisterPage,
});

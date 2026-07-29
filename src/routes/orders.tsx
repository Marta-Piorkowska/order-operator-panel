import {
   createFileRoute,
   redirect,
} from "@tanstack/react-router";

import { getAuth } from "../features/auth/auth.storage";
import { OrdersPage } from "../pages/OrdersPage";

export const Route = createFileRoute("/orders")({
   beforeLoad: () => {
      const auth = getAuth();

      if (!auth) {
         throw redirect({
            to: "/login",
         });
      }
   },
   component: OrdersPage,
});

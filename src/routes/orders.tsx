import {
   createFileRoute,
   redirect,
} from "@tanstack/react-router";
import { z } from "zod";

import { getAuth } from "../features/auth/auth.storage";
import { OrdersPage } from "../pages/OrdersPage";

const ordersSearchSchema = z.object({
   page: z.number().catch(1),
   pageSize: z.number().catch(10),
   search: z.string().catch(""),
   status: z.string().catch(""),
   sortBy: z.string().catch("createdAt"),
   sortDirection: z.enum(["asc", "desc"]).catch("desc"),
});

export const Route = createFileRoute("/orders")({
   beforeLoad: () => {
      const auth = getAuth();

      if (!auth) {
         throw redirect({
            to: "/login",
         });
      }
   },
   validateSearch: ordersSearchSchema,
   component: OrdersPage,
});

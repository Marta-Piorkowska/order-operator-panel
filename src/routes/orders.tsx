import {
   createFileRoute,
   redirect,
} from "@tanstack/react-router";
import { z } from "zod";

import { getAuth } from "../features/auth/auth.storage";
import { OrdersPage } from "../pages/OrdersPage";
import { OrderSortField, OrderStatus } from "../features/orders/orders.types";

const orderStatusValues = Object.keys(OrderStatus) as [
   OrderStatus,
   ...OrderStatus[],
];

const ordersSearchSchema = z.object({
   page: z.coerce.number().int().positive().catch(1),
   pageSize: z.coerce.number().int().positive().catch(10),

   search: z.string().catch(""),
   status: z
      .array(z.enum(orderStatusValues))
      .catch([]),

   minPrice: z.coerce.number().nonnegative().optional().catch(undefined),
   maxPrice: z.coerce.number().nonnegative().optional().catch(undefined),

   dateFrom: z.string().catch(""),
   dateTo: z.string().catch(""),

   sortBy: z
      .enum(OrderSortField)
      .catch("createdAt"),
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

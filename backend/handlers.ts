import { http, HttpResponse } from "msw";
import { database } from "./database";

import {
   getOrderDetails,
   getOrders,
   getOrderStats,
   updateBulkOrderStatus,
   updateOrderStatus,
} from "./services/order.service";

import type { OrderStatus } from "./order-status";

export const handlers = [
   http.get("/api/orders", () => {
      return HttpResponse.json(getOrders());
   }),

   http.get("/api/orders/:id", ({ params }) => {
      const orderId = Number(params.id);
      const order = getOrderDetails(orderId);

      if (!order) {
         return HttpResponse.json(
            { message: "Order not found" },
            { status: 404 },
         );
      }

      return HttpResponse.json(order);
   }),

   http.patch("/api/orders/:id/status", async ({ params, request }) => {
      const orderId = Number(params.id);

      const body = (await request.json()) as {
         status: OrderStatus;
         reason?: string;
         userId?: number;
      };

      try {
         const order = updateOrderStatus(
            orderId,
            body.status,
            body.userId,
            body.reason,
         );

         return HttpResponse.json(order);
      } catch (error) {
         return HttpResponse.json(
            {
               message:
                  error instanceof Error
                     ? error.message
                     : "Status update failed",
            },
            { status: 400 },
         );
      }
   }),

   http.post("/api/orders/bulk-status", async ({ request }) => {
      const body = (await request.json()) as {
         orderIds: number[];
         status: OrderStatus;
      };

      return HttpResponse.json(
         updateBulkOrderStatus(body.orderIds, body.status),
      );
   }),

   http.get("/api/orders/stats", () => {
      return HttpResponse.json(getOrderStats());
   }),

   http.post("/api/auth/login", async ({ request }) => {
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
   }),
];

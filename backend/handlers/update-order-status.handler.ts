import { http, HttpResponse } from "msw";

import type { OrderStatus } from "../order-status";
import {
   updateOrderStatus
} from "../services/order.service";

export const updateOrderStatusHandler = http.patch(
   "/api/orders/:id/status",
   async ({ params, request }) => {
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
   });

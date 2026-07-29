import { http, HttpResponse } from "msw";

import type { OrderStatus } from "../order-status";
import {
   updateBulkOrderStatus
} from "../services/order.service";

export const updateBulkOrderStatusHandler = http.patch(
   "/api/orders/bulk-status",
   async ({ request }) => {
      const body = (await request.json()) as {
         orderIds: number[];
         status: OrderStatus;
      };

      return HttpResponse.json(
         updateBulkOrderStatus(body.orderIds, body.status),
      );
   });

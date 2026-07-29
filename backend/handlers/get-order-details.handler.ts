import { http, HttpResponse } from "msw";
import {
   getOrderDetails
} from "../services/order.service";

export const getOrderDetailsHandler = http.post(
   "/api/orders/:id",
   ({ params }) => {

      const orderId = Number(params.id);
      const order = getOrderDetails(orderId);

      if (!order) {
         return HttpResponse.json(
            { message: "Order not found" },
            { status: 404 },
         );
      }

      return HttpResponse.json(order);
   },
);

import { http, HttpResponse } from "msw";

import {
   getOrderStats
} from "../services/order.service";

export const getOrderStatsHandler = http.post(
   "/api/orders/stats",
   () => {
      return HttpResponse.json(getOrderStats());
   },
);

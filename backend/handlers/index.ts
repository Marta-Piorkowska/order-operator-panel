import { getOrderDetailsHandler } from "./get-order-details.handler";
import { getOrderStatsHandler } from "./get-order-stats.handler";
import { getOrdersHandler } from "./get-orders.handler";
import { loginHandler } from "./login.handler";
import { updateBulkOrderStatusHandler } from "./update-bulk-order-status.handler";
import { updateOrderStatusHandler } from "./update-order-status.handler";

export const handlers = [
   getOrdersHandler,
   loginHandler,
   getOrderDetailsHandler,
   updateOrderStatusHandler,
   updateBulkOrderStatusHandler,
   getOrderStatsHandler,
];

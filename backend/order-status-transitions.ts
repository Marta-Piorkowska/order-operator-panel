import {
   OrderStatus,
} from "./order-status";

const S = OrderStatus;

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
   [S.NEW]: [S.PAID, S.CANCELLED],
   [S.PAID]: [S.PACKED, S.CANCELLED],
   [S.PACKED]: [S.SHIPPED],
   [S.SHIPPED]: [S.DELIVERED],
   [S.DELIVERED]: [S.RETURNED],
   [S.RETURNED]: [],
   [S.CANCELLED]: [],
};

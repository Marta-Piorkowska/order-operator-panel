export const OrderStatus = {
   NEW: "NEW",
   PAID: "PAID",
   PACKED: "PACKED",
   SHIPPED: "SHIPPED",
   DELIVERED: "DELIVERED",
   RETURNED: "RETURNED",
   CANCELLED: "CANCELLED",
} as const;

export type OrderStatus =
   (typeof OrderStatus)[keyof typeof OrderStatus];

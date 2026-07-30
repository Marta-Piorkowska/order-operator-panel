export const OrderStatus = {
   NEW: {
      label: "Nowe",
      color: "default",
   },
   PAID: {
      label: "Opłacone",
      color: "success",
   },
   PACKED: {
      label: "Spakowane",
      color: "info",
   },
   SHIPPED: {
      label: "Wysłane",
      color: "warning",
   },
   DELIVERED: {
      label: "Dostarczone",
      color: "success",
   },
   RETURNED: {
      label: "Zwrot",
      color: "secondary",
   },
   CANCELLED: {
      label: "Anulowane",
      color: "error",
   },
} as const;

export type OrderStatus = keyof typeof OrderStatus;

export const OrderSortField = [
   "orderNumber",
   "customer",
   "status",
   "totalAmount",
   "createdAt",
] as const;

export type OrderSortField =
   (typeof OrderSortField)[number];

export type SortDirection = "asc" | "desc";

export interface GetOrdersQuery {
   page: number;
   pageSize: number;
   search?: string;
   status?: OrderStatus[];
   minPrice?: number;
   maxPrice?: number;
   dateFrom?: string;
   dateTo?: string;
   sortBy?: OrderSortField;
   sortDirection?: SortDirection;
}

export interface OrderListItem {
   id: number;
   orderNumber: string;
   status: OrderStatus;
   totalAmount: number;
   createdAt: string;
   updatedAt: string;
   customer: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
   };
}

export interface OrdersResponse {
   data: OrderListItem[];
   pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
   };
}

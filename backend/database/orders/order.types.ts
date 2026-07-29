import type { OrderStatus } from "../../order-status";
import type { Customer } from "../customers/customer.types";

export interface Order {
   id: number;
   orderNumber: string;
   customerId: number;
   status: OrderStatus;
   currency: "PLN";
   createdAt: string;
   updatedAt: string;
}

export interface OrderListItem extends Order {
   customer: Customer | undefined;
   totalAmount: number;
}

export type OrderSortField =
   | "orderNumber"
   | "customer"
   | "status"
   | "totalAmount"
   | "createdAt";

export type SortDirection = "asc" | "desc";

export interface GetOrdersQuery {
   page: number;
   pageSize: number;
   search?: string;
   status?: OrderStatus;
   sortBy?: OrderSortField;
   sortDirection?: SortDirection;
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

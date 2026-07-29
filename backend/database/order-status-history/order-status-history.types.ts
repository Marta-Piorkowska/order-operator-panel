import { OrderStatus } from "../../order-status";

export interface OrderStatusHistory {
   id: number;
   orderId: number;
   previousStatus: OrderStatus;
   currentStatus: OrderStatus;
   changedByUserId: number;
   changedAt: string;
   reason?: string;
}

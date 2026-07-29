import { OrderStatus } from "../../order-status";

export interface Order {
   id: number;
   orderNumber: string;
   customerId: number;
   status: OrderStatus;
   currency: "PLN";
   createdAt: string;
   updatedAt: string;
}

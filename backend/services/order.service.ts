import { database } from "../database";
import type { OrderStatus } from "../order-status";
import { ORDER_STATUS_TRANSITIONS } from "../order-status-transitions";

const calculateOrderTotal = (orderId: number): number => {
   return database.orderItems
      .filter((item) => item.orderId === orderId)
      .reduce(
         (sum, item) => sum + item.quantity * item.unitPrice,
         0,
      );
};

const getCustomer = (customerId: number) => {
   return database.customers.find(
      (customer) => customer.id === customerId,
   );
};

export const getOrders = () => {
   return database.orders.map((order) => ({
      ...order,
      customer: getCustomer(order.customerId),
      totalAmount: calculateOrderTotal(order.id),
   }));
};

export const getOrderDetails = (orderId: number) => {
   const order = database.orders.find(
      (currentOrder) => currentOrder.id === orderId,
   );

   if (!order) {
      return null;
   }

   const items = database.orderItems
      .filter((item) => item.orderId === orderId)
      .map((item) => ({
         ...item,
         product: database.products.find(
            (product) => product.id === item.productId,
         ),
         totalPrice: item.quantity * item.unitPrice,
      }));

   const history = database.orderStatusHistory
      .filter((entry) => entry.orderId === orderId)
      .map((entry) => ({
         ...entry,
         changedBy: database.users.find(
            (user) => user.id === entry.changedByUserId,
         ),
      }));

   return {
      ...order,
      customer: getCustomer(order.customerId),
      items,
      history,
      totalAmount: calculateOrderTotal(order.id),
   };
};

export const updateOrderStatus = (
   orderId: number,
   nextStatus: OrderStatus,
   userId = 1,
   reason?: string,
) => {
   const order = database.orders.find(
      (currentOrder) => currentOrder.id === orderId,
   );

   if (!order) {
      throw new Error("Order not found");
   }

   const allowedStatuses = ORDER_STATUS_TRANSITIONS[order.status];

   if (!allowedStatuses.includes(nextStatus)) {
      throw new Error("Invalid status transition");
   }

   const previousStatus = order.status;
   const changedAt = new Date().toISOString();

   order.status = nextStatus;
   order.updatedAt = changedAt;

   database.orderStatusHistory.push({
      id: database.orderStatusHistory.length + 1,
      orderId,
      previousStatus,
      currentStatus: nextStatus,
      changedByUserId: userId,
      changedAt,
      reason,
   });

   return getOrderDetails(orderId);
};

export const updateBulkOrderStatus = (
   orderIds: number[],
   nextStatus: OrderStatus,
) => {
   const updated: number[] = [];
   const failed: Array<{ orderId: number; message: string }> = [];

   orderIds.forEach((orderId) => {
      try {
         updateOrderStatus(orderId, nextStatus);
         updated.push(orderId);
      } catch (error) {
         failed.push({
            orderId,
            message:
               error instanceof Error
                  ? error.message
                  : "Unknown error",
         });
      }
   });

   return {
      updated,
      failed,
   };
};

export const getOrderStats = () => ({
   totalOrders: database.orders.length,

   totalValue: database.orders.reduce(
      (sum, order) => sum + calculateOrderTotal(order.id),
      0,
   ),

   byStatus: database.orders.reduce<Record<string, number>>(
      (result, order) => {
         result[order.status] = (result[order.status] ?? 0) + 1;
         return result;
      },
      {},
   ),
});

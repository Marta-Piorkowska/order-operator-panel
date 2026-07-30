import { database } from "../database";
import type { OrderStatus } from "../order-status";
import { ORDER_STATUS_TRANSITIONS } from "../order-status-transitions";

import type {
   GetOrdersQuery,
   OrderListItem,
   OrderSortField,
   SortDirection,
} from "../database/orders/order.types";

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

const getOrderList = (): OrderListItem[] => {
   return database.orders.map((order) => ({
      ...order,
      customer: getCustomer(order.customerId),
      totalAmount: calculateOrderTotal(order.id),
   }));
};

const getOrderSortValue = (
   order: OrderListItem,
   sortBy: OrderSortField,
): string | number => {
   switch (sortBy) {
      case "customer":
         return order.customer
            ? `${order.customer.firstName} ${order.customer.lastName}`
            : "";

      case "totalAmount":
         return order.totalAmount;

      case "orderNumber":
         return order.orderNumber;

      case "status":
         return order.status;

      case "createdAt":
         return order.createdAt;
   }
};

const compareValues = (
   firstValue: string | number,
   secondValue: string | number,
   direction: SortDirection,
): number => {
   const comparison =
      typeof firstValue === "number" &&
         typeof secondValue === "number"
         ? firstValue - secondValue
         : String(firstValue).localeCompare(
            String(secondValue),
            "pl",
         );

   return direction === "asc" ? comparison : -comparison;
};

export const getOrders = ({
   page,
   pageSize,
   search,
   status,
   minPrice,
   maxPrice,
   dateFrom,
   dateTo,
   sortBy = "createdAt",
   sortDirection = "desc",
}: GetOrdersQuery) => {
   const normalizedSearch = search
      ?.trim()
      .toLowerCase();

   const orders = getOrderList()
      .filter((order) => {
         if (
            status &&
            status.length > 0 &&
            !status.includes(order.status)
         ) {
            return false;
         }

         if (
            minPrice !== undefined &&
            order.totalAmount < minPrice
         ) {
            return false;
         }

         if (
            maxPrice !== undefined &&
            order.totalAmount > maxPrice
         ) {
            return false;
         }

         const orderDate = order.createdAt.slice(0, 10);

         if (dateFrom && orderDate < dateFrom) {
            return false;
         }

         if (dateTo && orderDate > dateTo) {
            return false;
         }

         if (!normalizedSearch) {
            return true;
         }

         const customerName = order.customer
            ? `${order.customer.firstName} ${order.customer.lastName}`
            : "";

         return (
            order.orderNumber
               .toLowerCase()
               .includes(normalizedSearch) ||
            customerName
               .toLowerCase()
               .includes(normalizedSearch) ||
            order.customer?.email
               .toLowerCase()
               .includes(normalizedSearch)
         );
      })
      .sort((firstOrder, secondOrder) =>
         compareValues(
            getOrderSortValue(firstOrder, sortBy),
            getOrderSortValue(secondOrder, sortBy),
            sortDirection,
         ),
      );

   const totalItems = orders.length;
   const totalPages = Math.ceil(
      totalItems / pageSize,
   );

   const safePage =
      totalPages > 0
         ? Math.min(page, totalPages)
         : 1;

   const startIndex =
      (safePage - 1) * pageSize;

   return {
      data: orders.slice(
         startIndex,
         startIndex + pageSize,
      ),
      pagination: {
         page: safePage,
         pageSize,
         totalItems,
         totalPages,
      },
   };
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
         result[order.status] =
            (result[order.status] ?? 0) + 1;
         return result;
      },
      {},
   ),
});

import { fakerPL as faker } from "@faker-js/faker";

import type { Customer } from "./customers/customer.types";
import type { MockDatabase } from "./database.types";
import type { OrderItem } from "./order-items/order-item.types";
import type { OrderStatusHistory } from "./order-status-history/order-status-history.types";
import type { Order } from "./orders/order.types";
import type { Product } from "./products/product.types";
import type { User } from "./users/user.types";

import { OrderStatus } from "../order-status";

const SEED_CONFIG = {
   customers: 30,
   products: 20,
   orders: 100,
};

const AVAILABLE_STATUSES = Object.values(OrderStatus);

export const generateDatabase = (): MockDatabase => {
   faker.seed(123);

   const users: User[] = [
      {
         id: 1,
         username: "admin",
         email: "admin@example.com",
         password: "admin123",
         role: "admin",
         createdAt: "2026-01-01T08:00:00.000Z",
      },
      {
         id: 2,
         username: "operator",
         email: "operator@example.com",
         password: "operator123",
         role: "operator",
         createdAt: "2026-01-02T08:00:00.000Z",
      },
   ];

   const customers: Customer[] = Array.from(
      { length: SEED_CONFIG.customers },
      (_, index) => ({
         id: index + 1,
         firstName: faker.person.firstName(),
         lastName: faker.person.lastName(),
         email: faker.internet.email(),
         phone: faker.phone.number(),
         address: {
            street: faker.location.street(),
            houseNumber: faker.location.buildingNumber(),
            apartmentNumber: faker.helpers.maybe(
               () => faker.number.int({ min: 1, max: 100 }).toString(),
               { probability: 0.6 },
            ),
            postalCode: faker.location.zipCode(),
            city: faker.location.city(),
            country: "Polska",
         },
         createdAt: faker.date
            .between({
               from: "2025-01-01",
               to: "2026-07-01",
            })
            .toISOString(),
      }),
   );

   const products: Product[] = Array.from(
      { length: SEED_CONFIG.products },
      (_, index) => ({
         id: index + 1,
         sku: `SKU-${String(index + 1).padStart(4, "0")}`,
         name: faker.commerce.productName(),
         price: Number(
            faker.commerce.price({
               min: 20,
               max: 5000,
               dec: 2,
            }),
         ),
         currency: "PLN",
      }),
   );

   const orders: Order[] = Array.from(
      { length: SEED_CONFIG.orders },
      (_, index) => {
         const createdAt = faker.date.between({
            from: "2026-01-01",
            to: "2026-07-29",
         });

         return {
            id: index + 1,
            orderNumber: `ORD-2026-${String(index + 1).padStart(6, "0")}`,
            customerId: faker.helpers.arrayElement(customers).id,
            status: faker.helpers.arrayElement(AVAILABLE_STATUSES),
            currency: "PLN",
            createdAt: createdAt.toISOString(),
            updatedAt: createdAt.toISOString(),
         };
      },
   );

   let orderItemId = 1;

   const orderItems: OrderItem[] = orders.flatMap((order) => {
      const selectedProducts = faker.helpers.arrayElements(
         products,
         faker.number.int({ min: 1, max: 4 }),
      );

      return selectedProducts.map((product) => ({
         id: orderItemId++,
         orderId: order.id,
         productId: product.id,
         quantity: faker.number.int({ min: 1, max: 3 }),
         unitPrice: product.price,
      }));
   });

   let historyId = 1;

   const orderStatusHistory: OrderStatusHistory[] = orders
      .filter((order) => order.status !== OrderStatus.NEW)
      .map((order) => ({
         id: historyId++,
         orderId: order.id,
         previousStatus: OrderStatus.NEW,
         currentStatus: order.status,
         changedByUserId: faker.helpers.arrayElement(users).id,
         changedAt: order.updatedAt,
      }));

   return {
      users,
      customers,
      products,
      orders,
      orderItems,
      orderStatusHistory,
   };
};

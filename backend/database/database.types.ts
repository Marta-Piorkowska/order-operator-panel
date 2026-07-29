import type { Customer } from "./customers/customer.types";
import type { OrderItem } from "./order-items/order-item.types";
import type { OrderStatusHistory } from "./order-status-history/order-status-history.types";
import type { Order } from "./orders/order.types";
import type { Product } from "./products/product.types";
import type { User } from "./users/user.types";

export interface MockDatabase {
   users: User[];
   customers: Customer[];
   products: Product[];
   orders: Order[];
   orderItems: OrderItem[];
   orderStatusHistory: OrderStatusHistory[];
}

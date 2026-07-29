import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../orders.api";
import type { GetOrdersQuery } from "../orders.types";

export const ordersQueryKey = (query: GetOrdersQuery) =>
   ["orders", query] as const;

export const useOrders = (query: GetOrdersQuery) => {
   return useQuery({
      queryKey: ordersQueryKey(query),
      queryFn: () => getOrders(query),
   });
};

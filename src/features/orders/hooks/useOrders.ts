import {
   keepPreviousData,
   useQuery,
} from "@tanstack/react-query";

import { getOrders } from "../orders.api";
import type { GetOrdersQuery } from "../orders.types";

export const useOrders = (query: GetOrdersQuery) => {
   return useQuery({
      queryKey: ["orders", query],
      queryFn: () => getOrders(query),
      placeholderData: keepPreviousData,
   });
};

import { delay, http, HttpResponse } from "msw";

import type {
   GetOrdersQuery,
   OrderSortField,
   SortDirection,
} from "../database/orders/order.types";
import { OrderStatus } from "../order-status";
import { getOrders } from "../services/order.service";
import { simulateNetwork } from "./utils/simulate-network";

const ORDER_SORT_FIELDS: OrderSortField[] = [
   "orderNumber",
   "customer",
   "status",
   "totalAmount",
   "createdAt",
];

const isOrderStatus = (
   value: string,
): value is OrderStatus => {
   return Object.values(OrderStatus).includes(
      value as OrderStatus,
   );
};

const isOrderSortField = (
   value: string,
): value is OrderSortField => {
   return ORDER_SORT_FIELDS.includes(
      value as OrderSortField,
   );
};

const isSortDirection = (
   value: string,
): value is SortDirection => {
   return value === "asc" || value === "desc";
};

const parseOptionalNumber = (
   value: string | null,
): number | undefined => {
   if (value === null || value === "") {
      return undefined;
   }

   const parsedValue = Number(value);

   return Number.isFinite(parsedValue)
      ? parsedValue
      : undefined;
};

const parseOrdersQuery = (
   url: URL,
): GetOrdersQuery => {
   const pageParam = Number(url.searchParams.get("page"));
   const pageSizeParam = Number(
      url.searchParams.get("pageSize"),
   );

   const statusParams = url.searchParams.getAll("status");
   const sortByParam = url.searchParams.get("sortBy");
   const sortDirectionParam =
      url.searchParams.get("sortDirection");

   const minPriceParam = parseOptionalNumber(
      url.searchParams.get("minPrice"),
   );

   const maxPriceParam = parseOptionalNumber(
      url.searchParams.get("maxPrice"),
   );

   return {
      page:
         Number.isInteger(pageParam) && pageParam > 0
            ? pageParam
            : 1,

      pageSize:
         Number.isInteger(pageSizeParam) &&
            pageSizeParam > 0
            ? pageSizeParam
            : 10,

      search:
         url.searchParams
            .get("search")
            ?.trim() || undefined,

      status: statusParams.filter(isOrderStatus),

      minPrice:
         minPriceParam !== undefined &&
            minPriceParam >= 0
            ? minPriceParam
            : undefined,

      maxPrice:
         maxPriceParam !== undefined &&
            maxPriceParam >= 0
            ? maxPriceParam
            : undefined,

      dateFrom:
         url.searchParams.get("dateFrom") || undefined,

      dateTo:
         url.searchParams.get("dateTo") || undefined,

      sortBy:
         sortByParam && isOrderSortField(sortByParam)
            ? sortByParam
            : undefined,

      sortDirection:
         sortDirectionParam &&
            isSortDirection(sortDirectionParam)
            ? sortDirectionParam
            : undefined,
   };
};

export const getOrdersHandler = http.get(
   "/api/orders",
   async ({ request }) => {
      await simulateNetwork();
      await delay(500);

      const query = parseOrdersQuery(
         new URL(request.url),
      );

      return HttpResponse.json(
         getOrders(query),
      );
   },
);

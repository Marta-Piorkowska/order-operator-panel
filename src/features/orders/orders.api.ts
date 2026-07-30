import type {
   GetOrdersQuery,
   OrdersResponse,
} from "./orders.types";

const createSearchParams = (
   query: GetOrdersQuery,
): URLSearchParams => {
   const searchParams = new URLSearchParams();

   Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === "") {
         return;
      }

      if (Array.isArray(value)) {
         value.forEach((item) => {
            searchParams.append(key, item);
         });
         return;
      }

      searchParams.append(key, String(value));
   });

   return searchParams;
};

export const getOrders = async (
   query: GetOrdersQuery,
): Promise<OrdersResponse> => {
   const searchParams = createSearchParams(query);

   const response = await fetch(
      `/api/orders?${searchParams.toString()}`,
   );

   if (!response.ok) {
      throw new Error("Nie udało się pobrać zamówień.");
   }

   return response.json() as Promise<OrdersResponse>;
};

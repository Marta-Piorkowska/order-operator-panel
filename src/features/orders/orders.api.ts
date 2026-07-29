import type {
   GetOrdersQuery,
   OrdersResponse,
} from "./orders.types";

const createSearchParams = (
   query: GetOrdersQuery,
): URLSearchParams => {
   const entries = Object.entries(query)
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([key, value]) => [key, String(value)]);

   return new URLSearchParams(entries);
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

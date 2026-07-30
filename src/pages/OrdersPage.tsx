import {
   Alert,
   Box,
   CircularProgress,
   LinearProgress,
   Paper,
   Typography,
} from "@mui/material";

import { OrdersTable } from "../features/orders/components/OrdersTable";
import { useOrders } from "../features/orders/hooks/useOrders";
import { DashboardLayout } from "./DashboardLayout";
import { Route } from "../routes/orders";
import { OrdersFilters } from "./OrdersFilters";
import { useDebounce } from "../hooks/useDebounce";
import type {
   OnChangeFn,
   SortingState,
} from "@tanstack/react-table";

import {
   OrderSortField,
} from "../features/orders/orders.types";

export const OrdersPage = () => {
   const search = Route.useSearch();
   const navigate = Route.useNavigate();
   const filters = useDebounce(
      {
         search: search.search,
         minPrice: search.minPrice,
         maxPrice: search.maxPrice,
      },
      400,
   );

   const {
      data,
      isLoading,
      isFetching,
      isError,
   } = useOrders({
      page: search.page,
      pageSize: search.pageSize,
      search: filters.search || undefined,
      status: search.status,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      dateFrom: search.dateFrom || undefined,
      dateTo: search.dateTo || undefined,
      sortBy: search.sortBy,
      sortDirection: search.sortDirection,
   });

   const updateSearch = (values: Partial<typeof search>) => {
      navigate({
         search: (prev) => ({
            ...prev,
            ...values,
         }),
      });
   };

   const sorting: SortingState = [
      {
         id: search.sortBy,
         desc: search.sortDirection === "desc",
      },
   ];

   const handleSortingChange: OnChangeFn<SortingState> = (
      updater,
   ) => {
      const nextSorting =
         typeof updater === "function"
            ? updater(sorting)
            : updater;

      const nextSort = nextSorting[0];

      if (!nextSort) {
         updateSearch({
            page: 1,
            sortBy: "createdAt",
            sortDirection: "desc",
         });

         return;
      }

      updateSearch({
         page: 1,
         sortBy: nextSort.id as OrderSortField,
         sortDirection: nextSort.desc
            ? "desc"
            : "asc",
      });
   };

   return (
      <DashboardLayout>
         <Typography
            variant="h4"
            component="h1"
            fontWeight={700}
            gutterBottom
         >
            Zamówienia
         </Typography>

         <Typography
            color="text.secondary"
            sx={{ mb: 3 }}
         >
            Zarządzaj zamówieniami klientów.
         </Typography>

         <Paper
            variant="outlined"
            sx={{
               minHeight: 320,
               overflow: "hidden",
               position: "relative",
            }}
         >
            <OrdersFilters
               value={{
                  search: search.search,
                  status: search.status,
                  minPrice: search.minPrice,
                  maxPrice: search.maxPrice,
                  dateFrom: search.dateFrom,
                  dateTo: search.dateTo,
               }}
               onChange={(changes) =>
                  updateSearch({
                     ...changes,
                     page: 1,
                  })
               }
               onClear={() =>
                  updateSearch({
                     page: 1,
                     search: "",
                     status: [],
                     minPrice: undefined,
                     maxPrice: undefined,
                     dateFrom: "",
                     dateTo: "",
                  })
               }
            />

            {isFetching && !isLoading && (
               <LinearProgress
                  sx={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     right: 0,
                  }}
               />
            )}

            {isError && (
               <Alert
                  severity="error"
                  sx={{ mx: 2, mb: 2 }}
               >
                  Nie udało się pobrać zamówień.
               </Alert>
            )}

            {isLoading && (
               <Box
                  sx={{
                     minHeight: 240,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  <CircularProgress />
               </Box>
            )}

            {!isLoading && data && (
               <OrdersTable
                  data={data.data}
                  page={data.pagination.page}
                  pageSize={data.pagination.pageSize}
                  totalItems={data.pagination.totalItems}
                  onPageChange={(page) =>
                     updateSearch({ page })
                  }
                  onPageSizeChange={(pageSize) =>
                     updateSearch({
                        page: 1,
                        pageSize,
                     })
                  }
                  sorting={sorting}
                  onSortingChange={handleSortingChange}
               />
            )}
         </Paper>
      </DashboardLayout>
   );
};

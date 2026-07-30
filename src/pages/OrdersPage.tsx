import {
   Alert,
   CircularProgress,
   Paper,
   Typography,
} from "@mui/material";

import { OrdersTable } from "../features/orders/components/OrdersTable";
import { useOrders } from "../features/orders/hooks/useOrders";
import { DashboardLayout } from "./DashboardLayout";
import { Route } from "../routes/orders";

export const OrdersPage = () => {
   const search = Route.useSearch();
   const navigate = Route.useNavigate();

   const { data, isLoading, isError } = useOrders({
      page: search.page,
      pageSize: search.pageSize,
   });

   const updateSearch = (values: Partial<typeof search>) => {
      navigate({
         search: (prev) => ({
            ...prev,
            ...values,
         }),
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
            }}
         >
            {isLoading && (
               <Paper
                  elevation={0}
                  sx={{
                     minHeight: 320,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  <CircularProgress />
               </Paper>
            )}

            {isError && (
               <Alert severity="error">
                  Nie udało się pobrać zamówień.
               </Alert>
            )}

            {data && (
               <OrdersTable
                  data={data.data}
                  page={data.pagination.page}
                  pageSize={data.pagination.pageSize}
                  totalItems={data.pagination.totalItems}
                  onPageChange={(page) => updateSearch({ page })}
                  onPageSizeChange={(pageSize) =>
                     updateSearch({
                        page: 1,
                        pageSize,
                     })
                  }
               />
            )}
         </Paper>
      </DashboardLayout>
   );
};

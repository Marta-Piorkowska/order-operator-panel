import {
   Paper,
   Typography,
} from "@mui/material";

import { DashboardLayout } from "./DashboardLayout";

export const OrdersPage = () => {
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
               p: 3,
               minHeight: 320,
            }}
         >
            <Typography color="text.secondary">
               Tutaj pojawi się tabela zamówień.
            </Typography>
         </Paper>
      </DashboardLayout>
   );
};

import { useNavigate } from "@tanstack/react-router";
import {
   Box,
   Button,
   Typography,
} from "@mui/material";

import {
   clearAuth,
   getAuth,
} from "../features/auth/auth.storage";

export const OrdersPage = () => {
   const navigate = useNavigate();
   const auth = getAuth();

   const handleLogout = async () => {
      clearAuth();

      await navigate({
         to: "/login",
         replace: true,
      });
   };

   return (
      <Box sx={{ p: 4 }}>
         <Typography variant="h4" gutterBottom>
            Zamówienia
         </Typography>

         <Typography sx={{ mb: 2 }}>
            Zalogowano jako: {auth?.user.username}
         </Typography>

         <Button
            variant="outlined"
            onClick={handleLogout}
         >
            Wyloguj
         </Button>
      </Box>
   );
};

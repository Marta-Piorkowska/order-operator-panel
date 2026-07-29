import { Box, Button, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

export const RegisterPage = () => {
   return (
      <Box sx={{ p: 4 }}>
         <Typography variant="h4" gutterBottom>
            Rejestracja w trakcie budowy
         </Typography>

         <Typography sx={{ mb: 3 }}>
            Moduł rejestracji będzie dostępny w kolejnej wersji.
         </Typography>

         <Button
            component={Link}
            to="/login"
            variant="contained"
         >
            Przejdź do logowania
         </Button>
      </Box>
   );
};

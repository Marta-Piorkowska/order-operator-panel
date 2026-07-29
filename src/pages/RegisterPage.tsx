import { Link } from "@tanstack/react-router";
import {
   Box,
   Button,
   Card,
   CardContent,
   Typography,
} from "@mui/material";

export const RegisterPage = () => {
   return (
      <Box
         sx={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            bgcolor: "grey.100",
            p: 2,
         }}
      >
         <Card sx={{ width: "100%", maxWidth: 420 }}>
            <CardContent
               sx={{
                  p: 4,
                  textAlign: "center",
               }}
            >
               <Typography variant="h4" component="h1" gutterBottom>
                  Rejestracja w trakcie budowy
               </Typography>

               <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Konto pracownika może obecnie utworzyć wyłącznie
                  administrator.
               </Typography>

               <Button
                  component={Link}
                  to="/login"
                  variant="contained"
               >
                  Przejdź do logowania
               </Button>
            </CardContent>
         </Card>
      </Box>
   );
};

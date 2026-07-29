import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
   Alert,
   Box,
   Button,
   Card,
   CardContent,
   TextField,
   Typography,
} from "@mui/material";

import { login } from "../features/auth/auth.api";
import { saveAuth } from "../features/auth/auth.storage";

export const LoginPage = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState("admin@example.com");
   const [password, setPassword] = useState("admin123");
   const [error, setError] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = async (
      event: FormEvent<HTMLFormElement>,
   ) => {
      event.preventDefault();

      setError("");
      setIsSubmitting(true);

      try {
         const auth = await login({
            email,
            password,
         });

         saveAuth(auth);

         await navigate({
            to: "/orders",
         });
      } catch (error) {
         setError(
            error instanceof Error
               ? error.message
               : "Nie udało się zalogować.",
         );
      } finally {
         setIsSubmitting(false);
      }
   };

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
            <CardContent sx={{ p: 4 }}>
               <Typography variant="h4" component="h1" gutterBottom>
                  Zaloguj się
               </Typography>

               <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Wprowadź dane konta operatora.
               </Typography>

               <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                     display: "grid",
                     gap: 2,
                  }}
               >
                  <TextField
                     label="Adres e-mail"
                     type="email"
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                     autoComplete="email"
                     required
                     fullWidth
                  />

                  <TextField
                     label="Hasło"
                     type="password"
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                     autoComplete="current-password"
                     required
                     fullWidth
                  />

                  {error && (
                     <Alert severity="error">
                        {error}
                     </Alert>
                  )}

                  <Button
                     type="submit"
                     variant="contained"
                     size="large"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? "Logowanie..." : "Zaloguj się"}
                  </Button>

                  <Typography
                     variant="body2"
                     align="center"
                     color="text.secondary"
                  >
                     Nie masz konta?{" "}
                     <Link to="/register">
                        Zarejestruj się
                     </Link>
                  </Typography>
               </Box>
            </CardContent>
         </Card>
      </Box>
   );
};

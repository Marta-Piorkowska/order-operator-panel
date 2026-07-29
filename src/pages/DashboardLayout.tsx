import { useState, type ReactNode } from "react";
import {
   Box,
   Drawer,
   IconButton,
   useMediaQuery,
   useTheme,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
   children: ReactNode;
}

const drawerWidth = 232;

export const DashboardLayout = ({
   children,
}: DashboardLayoutProps) => {
   const theme = useTheme();

   const isDesktop = useMediaQuery(
      theme.breakpoints.up("md"),
   );

   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

   const closeMobileDrawer = () => {
      if (!isDesktop) {
         setIsDrawerOpen(false);
      }
   };

   return (
      <Box
         sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f7f8fc" }}
      >
         {!isDesktop && (
            <IconButton
               onClick={() => setIsDrawerOpen(true)}
               aria-label="Otwórz menu nawigacji"
               sx={{
                  position: "fixed",
                  top: 16,
                  left: 16,
                  zIndex: theme.zIndex.appBar,
                  bgcolor: "background.paper",
                  border: 1,
                  borderColor: "divider",
                  boxShadow: 1,

                  "&:hover": {
                     bgcolor: "background.paper",
                  },
               }}
            >
               <Menu />
            </IconButton>
         )}

         <Box
            component="nav"
            aria-label="Główna nawigacja"
            sx={{
               width: { md: drawerWidth, },
               flexShrink: { md: 0 },
            }}
         >
            <Drawer
               variant={isDesktop ? "permanent" : "temporary"}
               open={isDesktop || isDrawerOpen}
               onClose={() => setIsDrawerOpen(false)}
               ModalProps={{
                  keepMounted: true,
               }}
               sx={{
                  "& .MuiDrawer-paper": {
                     width: drawerWidth,
                     boxSizing: "border-box",
                     border: 0,
                  },
               }}
            >
               <Sidebar onNavigate={closeMobileDrawer} />
            </Drawer>
         </Box>

         <Box
            component="main"
            sx={{
               flexGrow: 1,
               minWidth: 0,
               width: {
                  md: `calc(100% - ${drawerWidth}px)`,
               },
               p: {
                  xs: 2,
                  sm: 3,
                  md: 3,
               },
               pt: {
                  xs: 9,
                  md: 3,
               },
            }}
         >
            {children}
         </Box>
      </Box>
   );
};

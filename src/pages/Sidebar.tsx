import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
   Avatar,
   Box,
   Button,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Tooltip,
   Typography,
} from "@mui/material";
import {
   BookmarkBorder,
   Logout,
   QueryStats,
   ReceiptLong,
   SettingsOutlined,
   ViewInAr,
} from "@mui/icons-material";

import {
   clearAuth,
   getAuth,
} from "../features/auth/auth.storage";

interface SidebarProps {
   onNavigate: () => void;
}

interface SidebarMenuItem {
   label: string;
   icon: ReactNode;
   to?: "/orders";
}

interface SidebarMenuItemButtonProps {
   item: SidebarMenuItem;
   onNavigate: () => void;
}

const menuItems: SidebarMenuItem[] = [
   {
      label: "Zamówienia",
      icon: <ReceiptLong fontSize="small" />,
      to: "/orders",
   },
   {
      label: "Statystyki",
      icon: <QueryStats fontSize="small" />,
   },
   {
      label: "Ustawienia",
      icon: <SettingsOutlined fontSize="small" />,
   },
   {
      label: "Widoki zapisane",
      icon: <BookmarkBorder fontSize="small" />,
   },
];

const baseMenuItemStyles = {
   minHeight: 44,
   mb: 0.75,
   borderRadius: 2,
   color: "rgba(255, 255, 255, 0.82)",

   "& .MuiListItemIcon-root": {
      color: "inherit",
   },
};

const activeMenuItemStyles = {
   ...baseMenuItemStyles,
   bgcolor: "#4f32b8",
   color: "common.white",

   "&:hover": {
      bgcolor: "#5b3dcc",
   },
};

const SidebarMenuItemButton = ({
   item,
   onNavigate,
}: SidebarMenuItemButtonProps) => {
   const content = (
      <>
         <ListItemIcon sx={{ minWidth: 40 }}>
            {item.icon}
         </ListItemIcon>

         <ListItemText
            primary={item.label}
            primaryTypographyProps={{
               fontSize: 14,
               fontWeight: item.to ? 600 : 500,
            }}
         />
      </>
   );

   if (item.to) {
      return (
         <ListItemButton
            component={Link}
            to={item.to}
            onClick={onNavigate}
            sx={activeMenuItemStyles}
         >
            {content}
         </ListItemButton>
      );
   }

   return (
      <Tooltip
         title="Dostępne w kolejnej wersji"
         placement="right"
         arrow
      >
         <span>
            <ListItemButton
               disabled
               sx={baseMenuItemStyles}
            >
               {content}
            </ListItemButton>
         </span>
      </Tooltip>
   );
};

export const Sidebar = ({
   onNavigate,
}: SidebarProps) => {
   const navigate = useNavigate();

   const auth = getAuth();
   const user = auth?.user;

   const handleLogout = async () => {
      clearAuth();

      await navigate({
         to: "/login",
         replace: true,
      });
   };

   return (
      <Box
         sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#0f1b33",
            color: "common.white",
         }}
      >
         <Box
            sx={{
               minHeight: 72,
               px: 2.5,
               display: "flex",
               alignItems: "center",
               gap: 1.5,
            }}
         >
            <Box
               sx={{
                  width: 34,
                  height: 34,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 2,
                  bgcolor: "#2563eb",
                  color: "common.white",
               }}
            >
               <ViewInAr fontSize="small" />
            </Box>

            <Typography
               variant="subtitle1"
               fontWeight={700}
            >
               Panel operatora
            </Typography>
         </Box>

         <List
            sx={{ px: 1.5, py: 1 }}
         >
            {menuItems.map((item) => (
               <SidebarMenuItemButton
                  key={item.label}
                  item={item}
                  onNavigate={onNavigate}
               />
            ))}
         </List>

         <Box sx={{ flexGrow: 1 }} />

         <Box sx={{ px: 2.5, pb: 2 }}         >
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 2,
               }}
            >
               <Avatar
                  sx={{
                     width: 38,
                     height: 38,
                     bgcolor: "#4f32b8",
                     fontSize: 14,
                     fontWeight: 700,
                  }}
               >
                  {user?.username.charAt(0).toUpperCase()}
               </Avatar>

               <Box sx={{ minWidth: 0 }}>
                  <Typography
                     variant="body2"
                     fontWeight={600}
                     noWrap
                  >
                     {user?.username}
                  </Typography>

                  <Typography
                     variant="caption"
                     sx={{ color: "rgba(255, 255, 255, 0.62)" }}
                  >
                     {user?.email}
                  </Typography>
               </Box>
            </Box>

            <Button
               onClick={handleLogout}
               startIcon={<Logout />}
               fullWidth
               sx={{
                  justifyContent: "flex-start",
                  color: "common.white",
                  textTransform: "none",
                  px: 1,
                  py: 1,

                  "&:hover": {
                     bgcolor: "rgba(255, 255, 255, 0.08)",
                  },
               }}
            >
               Wyloguj
            </Button>
         </Box>
      </Box>
   );
};

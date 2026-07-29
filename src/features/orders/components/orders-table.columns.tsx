import { Chip } from "@mui/material";
import type { ColumnDef } from "@tanstack/react-table";

import {
   OrderStatus,
   type OrderListItem,
} from "../orders.types";

export const ordersTableColumns: ColumnDef<OrderListItem>[] = [
   {
      accessorKey: "orderNumber",
      header: "Numer zamówienia",
   },
   {
      id: "customer",
      header: "Klient",
      cell: ({ row }) => {
         const { firstName, lastName } = row.original.customer;

         return `${firstName} ${lastName}`;
      },
   },
   {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
         const status = getValue<keyof typeof OrderStatus>();
         console.log(status);

         return (
            <Chip
               label={OrderStatus[status].label}
               color={OrderStatus[status].color}
               size="small"
               variant="outlined"
            />
         );
      },
   },
   {
      accessorKey: "totalAmount",
      header: "Wartość",
      cell: ({ getValue }) => {
         const value = getValue<number>();

         return new Intl.NumberFormat("pl-PL", {
            style: "currency",
            currency: "PLN",
         }).format(value);
      },
   },
   {
      accessorKey: "createdAt",
      header: "Data utworzenia",
      cell: ({ getValue }) => {
         const value = getValue<string>();

         return new Intl.DateTimeFormat("pl-PL").format(
            new Date(value),
         );
      },
   },
];

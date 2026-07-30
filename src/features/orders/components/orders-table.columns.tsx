import { Chip, TableSortLabel } from "@mui/material";
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
      header: ({ column }) => (
         <TableSortLabel
            active={column.getIsSorted() !== false}
            direction={
               column.getIsSorted() === "asc"
                  ? "asc"
                  : "desc"
            }
            onClick={column.getToggleSortingHandler()}
         >
            Wartość
         </TableSortLabel>
      ),
      cell: ({ getValue }) => {
         const value = getValue<number>();

         return new Intl.NumberFormat("pl-PL", {
            style: "currency",
            currency: "PLN",
         }).format(value);
      },
      enableSorting: true,
   },
   {
      accessorKey: "createdAt",
      header: ({ column }) => (
         <TableSortLabel
            active={column.getIsSorted() !== false}
            direction={
               column.getIsSorted() === "asc"
                  ? "asc"
                  : "desc"
            }
            onClick={column.getToggleSortingHandler()}
         >
            Data utworzenia
         </TableSortLabel>
      ),
      cell: ({ getValue }) => {
         const value = getValue<string>();

         return new Intl.DateTimeFormat("pl-PL").format(
            new Date(value),
         );
      },
      enableSorting: true,
   },
];

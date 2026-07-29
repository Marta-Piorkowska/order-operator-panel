import {
   flexRender,
   getCoreRowModel,
   useReactTable,
} from "@tanstack/react-table";
import {
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
} from "@mui/material";

import type { OrderListItem } from "../orders.types";
import { ordersTableColumns } from "./orders-table.columns";

interface OrdersTableProps {
   data: OrderListItem[];
}

export const OrdersTable = ({ data }: OrdersTableProps) => {
   const table = useReactTable({
      data,
      columns: ordersTableColumns,
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <TableContainer component={Paper}>
         <Table>
            <TableHead>
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map((header) => (
                        <TableCell key={header.id}>
                           {header.isPlaceholder
                              ? null
                              : flexRender(
                                 header.column.columnDef.header,
                                 header.getContext(),
                              )}
                        </TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableHead>

            <TableBody>
               {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                     {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                           {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                           )}
                        </TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

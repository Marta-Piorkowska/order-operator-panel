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
   TablePagination,
   TableRow,
} from "@mui/material";

import type { OrderListItem } from "../orders.types";
import { ordersTableColumns } from "./orders-table.columns";

interface OrdersTableProps {
   data: OrderListItem[];
   page: number;
   pageSize: number;
   totalItems: number;
   onPageChange: (page: number) => void;
   onPageSizeChange: (pageSize: number) => void;
}

export const OrdersTable = ({
   data,
   page,
   pageSize,
   totalItems,
   onPageChange,
   onPageSizeChange,
}: OrdersTableProps) => {
   const table = useReactTable({
      data,
      columns: ordersTableColumns,
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <Paper variant="outlined">
         <TableContainer>
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

         <TablePagination
            component="div"
            count={totalItems}
            page={page - 1}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[10, 20, 50]}
            labelRowsPerPage="Wierszy na stronę:"
            labelDisplayedRows={({ from, to, count }) =>
               `${from}–${to} z ${count}`
            }
            onPageChange={(_, nextPage) => {
               onPageChange(nextPage + 1);
            }}
            onRowsPerPageChange={(event) => {
               onPageSizeChange(Number(event.target.value));
            }}
         />
      </Paper>
   );
};

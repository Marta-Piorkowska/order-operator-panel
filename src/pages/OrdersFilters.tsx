import {
   Box,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Button
} from "@mui/material";

import {
   OrderStatus,
   type OrderStatus as OrderStatusType,
} from "../features/orders/orders.types";

interface OrdersFiltersValue {
   search: string;
   status: OrderStatusType[];
   minPrice?: number;
   maxPrice?: number;
   dateFrom: string;
   dateTo: string;
}

interface OrdersFiltersProps {
   value: OrdersFiltersValue;
   onChange: (
      changes: Partial<OrdersFiltersValue>,
   ) => void;
   onClear: () => void;
}

export const OrdersFilters = ({
   value,
   onChange,
   onClear,
}: OrdersFiltersProps) => {
   return (
      <Box
         sx={{
            display: "grid",
            gridTemplateColumns: {
               xs: "1fr",
               md: "2fr 1fr 1fr 1fr",
            },
            gap: 2,
            p: 2,
         }}
      >
         <TextField
            label="Szukaj"
            placeholder="Numer zamówienia lub imię klienta"
            value={value.search}
            onChange={(event) =>
               onChange({
                  search: event.target.value,
               })
            }
         />

         <FormControl>
            <InputLabel>Status</InputLabel>

            <Select
               multiple
               label="Status"
               value={value.status}
               onChange={(event) => {
                  const selectedStatuses = event.target.value;

                  onChange({
                     status:
                        typeof selectedStatuses === "string"
                           ? (selectedStatuses.split(",") as OrderStatusType[])
                           : (selectedStatuses as OrderStatusType[]),
                  });
               }}
               renderValue={(selected) =>
                  selected
                     .map((status) => OrderStatus[status].label)
                     .join(", ")
               }
            >
               {Object.entries(OrderStatus).map(
                  ([status, config]) => (
                     <MenuItem
                        key={status}
                        value={status}
                     >
                        {config.label}
                     </MenuItem>
                  ),
               )}
            </Select>
         </FormControl>

         <TextField
            label="Cena od"
            type="number"
            value={value.minPrice ?? ""}
            onChange={(event) =>
               onChange({
                  minPrice:
                     event.target.value === ""
                        ? undefined
                        : Number(event.target.value),
               })
            }
            slotProps={{
               htmlInput: {
                  min: 0,
               },
            }}
         />

         <TextField
            label="Cena do"
            type="number"
            value={value.maxPrice ?? ""}
            onChange={(event) =>
               onChange({
                  maxPrice:
                     event.target.value === ""
                        ? undefined
                        : Number(event.target.value),
               })
            }
            slotProps={{
               htmlInput: {
                  min: 0,
               },
            }}
         />

         <TextField
            label="Data od"
            type="date"
            value={value.dateFrom}
            onChange={(event) =>
               onChange({
                  dateFrom: event.target.value,
               })
            }
            slotProps={{
               inputLabel: {
                  shrink: true,
               },
            }}
         />

         <TextField
            label="Data do"
            type="date"
            value={value.dateTo}
            onChange={(event) =>
               onChange({
                  dateTo: event.target.value,
               })
            }
            slotProps={{
               inputLabel: {
                  shrink: true,
               },
            }}
         />
         <Button
            variant="contained"
            color="primary"
            onClick={onClear}
            sx={{
               height: 56,
            }}
         >
            Wyczyść filtry
         </Button>
      </Box>
   );
};

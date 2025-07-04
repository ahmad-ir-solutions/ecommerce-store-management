import { useState, useMemo, useCallback, useEffect } from "react";
import { Header } from "@/components/shared/header";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/shared/custom-select";
import { Switch } from "@/components/ui/switch";
import { DateRangePickerFilter } from "@/components/shared/date-range-picker-filter";
import {
  Column, ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable, FilterFn,
  // FilterFnOption 
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

interface AdHocOrderItem {
  sku: string;
  quantity: number;
  stockLocation: string;
}

interface OutstandingOrder {
  id: number;
  select: boolean;
  purchaseOrderId: string;
  supplier: string;
  warehouse: string;
  dateRaised: string;
  status: string;
  totalValue: string;
  totalLines: number;
}

// Custom filter function for date range
const dateRangeFilter: FilterFn<OutstandingOrder> = (row, columnId, value) => {
  const date = new Date(row.getValue(columnId));
  // Value from DateRangePickerFilter is an object { from, to }
  const { from, to } = value as { from?: Date; to?: Date };

  if (!from && !to) return true;
  const fromDate = from ? new Date(from) : null;
  const toDate = to ? new Date(to) : null;

  if (fromDate && !toDate) return date >= fromDate;
  if (!fromDate && toDate) return date <= toDate;
  if (fromDate && toDate) return date >= fromDate && date <= toDate;

  return false; // Should not reach here if value is handled correctly
};

// Simulate fetching data with filters
const fetchOutstandingOrders = async (filters: any): Promise<OutstandingOrder[]> => {
  // In a real application, you would make an API call here,
  // passing the filters as query parameters.
  console.log("Fetching orders with filters:", filters);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const dummyOutstandingOrders: OutstandingOrder[] = [  
    { id: 1, select: false, purchaseOrderId: "PO-001", supplier: "Supplier A", warehouse: "Warehouse 1", dateRaised: "2023-10-26", status: "pending", totalValue: "100.00", totalLines: 5 },
    { id: 2, select: false, purchaseOrderId: "PO-002", supplier: "Supplier B", warehouse: "Warehouse 2", dateRaised: "2023-10-25", status: "completed", totalValue: "250.00", totalLines: 10 },
    { id: 3, select: false, purchaseOrderId: "PO-003", supplier: "Supplier A", warehouse: "Warehouse 1", dateRaised: "2023-11-01", status: "pending", totalValue: "150.00", totalLines: 7 },
    { id: 4, select: false, purchaseOrderId: "PO-004", supplier: "Supplier C", warehouse: "Warehouse 2", dateRaised: "2023-11-05", status: "completed", totalValue: "300.00", totalLines: 12 },
  ];

  // Apply filtering based on the received filters (simulating server-side)
  let filteredData = dummyOutstandingOrders;

  if (filters?.purchaseOrderId) { // Check if filter is applied
    filteredData = filteredData.filter(order => order.purchaseOrderId.includes(filters.purchaseOrderId));
  }
  if (filters?.supplier && filters.supplier !== 'all') {
    filteredData = filteredData.filter(order => order.supplier === filters.supplier);
  }
  if (filters?.warehouse && filters.warehouse !== 'all') {
    filteredData = filteredData.filter(order => order.warehouse === filters.warehouse);
  }
  if (filters?.status && filters.status !== 'all') {
    filteredData = filteredData.filter(order => order.status === filters.status);
  }
  if (filters?.totalLines) {
    const totalLinesValue = filters.totalLines.toString().trim();
    if (totalLinesValue) {
      filteredData = filteredData.filter(order =>
        order.totalLines.toString().includes(totalLinesValue)
      );
    }
  }
  if (filters?.dateRaised) { // Use 'dateRaised' as the key for the date range filter value
    const { from, to } = filters.dateRaised as { from?: Date; to?: Date };
    filteredData = filteredData.filter(order => {
      const orderDate = new Date(order.dateRaised);
      const fromDate = from ? new Date(from) : null;
      const toDate = to ? new Date(to) : null;

      if (fromDate && !toDate) return orderDate >= fromDate;
      if (!fromDate && toDate) return orderDate <= toDate;
      if (fromDate && toDate) return orderDate >= fromDate && orderDate <= toDate;
      return false; // Should be filtered out if no date match
    });
  }

  return filteredData;
};

// const dummyAdHocData: AdHocOrderItem[] = [
//   { sku: "57673132437", quantity: 1, stockLocation: "L4-PL4" },
// ];

const warehouseOptions = [
  { id: "all", label: "All", value: "all" },
  { id: "wh1", label: "Warehouse 1", value: "Warehouse 1" },
  { id: "wh2", label: "Warehouse 2", value: "Warehouse 2" },
];

const supplierOptions = [
  { id: "all", label: "All", value: "all" },
  { id: "supA", label: "Supplier A", value: "Supplier A" },
  { id: "supB", label: "Supplier B", value: "Supplier B" },
];

const statusOptions = [
  { id: "all", label: "All", value: "all" },
  { id: "pending", label: "Pending", value: "pending" },
  { id: "completed", label: "Completed", value: "completed" },
];

// Dummy stock location options
const stockLocationOptions = [
  { id: "l4pl4", label: "L4-PL4", value: "L4-PL4" },
  { id: "a1b2", label: "A1-B2", value: "A1-B2" },
  { id: "c3d4", label: "C3-D4", value: "C3-D4" },
];

export function DeliveriesPage() {
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("0.00");
  const [adHocItem, setAdHocItem] = useState<AdHocOrderItem | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [debouncedFilters, setDebouncedFilters] = useState<any[]>([]);

  // Add debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(columnFilters);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [columnFilters]);

  const { data: outstandingOrders, isLoading, error } = useQuery<OutstandingOrder[]>({
    queryKey: ["outstandingOrders", debouncedFilters],
    queryFn: () => fetchOutstandingOrders(debouncedFilters.reduce((acc, filter) => {
      acc[filter.id] = filter.value;
      return acc;
    }, {})),
  });

  // Add clear filters function
  const handleClearFilters = useCallback(() => {
    setColumnFilters([]);
    table.resetColumnFilters();
  }, []);

  const columns = useMemo<ColumnDef<OutstandingOrder>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "purchaseOrderId",
      header: "Purchase Order ID",
      cell: ({ row }) => row.getValue("purchaseOrderId"),
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
      cell: ({ row }) => row.getValue("supplier"),
      filterFn: "equals",
    },
    {
      accessorKey: "warehouse",
      header: "Warehouse",
      cell: ({ row }) => row.getValue("warehouse"),
      filterFn: "equals",
    },
    {
      accessorKey: "dateRaised",
      header: "Date Raised",
      cell: ({ row }) => row.getValue("dateRaised"),
      filterFn: dateRangeFilter,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => row.getValue("status"),
      filterFn: "equals",
    },
    {
      accessorKey: "totalValue",
      header: "Total Value",
      cell: ({ row }) => row.getValue("totalValue"),
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "totalLines",
      header: "Total Lines / Cartons / Units / Inventory",
      cell: ({ row }) => row.getValue("totalLines"),
      enableSorting: false,
      filterFn: "equals",
    },
  ], []);

  const table = useReactTable({
    data: outstandingOrders || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  });

  const handleAddAdHocItem = () => {
    if (sku && quantity) {
      setAdHocItem({ sku, quantity: parseFloat(quantity), stockLocation: stockLocationOptions[0].value as string });
      setSku("");
      setQuantity("0.00");
    }
  };

  // Handler for updating stock location for the single ad-hoc item
  const handleStockLocationChange = (value: string | number) => {
    if (adHocItem) {
      setAdHocItem({ ...adHocItem, stockLocation: value as string });
    }
  };

  const renderFilter = (column: Column<OutstandingOrder, any>) => {
    if (column.id === 'purchaseOrderId') {
      return (
        <Input
          placeholder="Filter ID"
          value={(column.getFilterValue() ?? '') as string}
          onChange={e => column.setFilterValue(e.target.value)}
          className="bg-white h-9 text-xs border-gray-200"
        />
      );
    } else if (column.id === 'supplier') {
      return (
        <CustomSelect
          placeholder="Select Supplier"
          options={supplierOptions}
          defaultValue={column.getFilterValue() as string ?? 'all'}
          onChange={value => column.setFilterValue(value)}
          className="bg-white h-9 text-xs border-gray-200"
        />
      );
    } else if (column.id === 'warehouse') {
      return (
        <CustomSelect
          placeholder="Select Warehouse"
          options={warehouseOptions}
          defaultValue={column.getFilterValue() as string ?? 'all'}
          onChange={value => column.setFilterValue(value)}
          className="bg-white h-9 text-xs border-gray-200"
        />
      );
    } else if (column.id === 'status') {
      return (
        <CustomSelect
          placeholder="Select Status"
          options={statusOptions}
          defaultValue={column.getFilterValue() as string ?? 'all'}
          onChange={value => column.setFilterValue(value)}
          className="bg-white h-9 text-xs border-gray-200"
        />
      );
    } else if (column.id === 'dateRaised') {
      return (
        <DateRangePickerFilter column={column as Column<any, any>}  className="border-gray-200"/>
      );
    } else if (column.id === 'totalLines') {
      return (
        <Input
          placeholder="Total lines"
          value={(column.getFilterValue() ?? '') as string}
          onChange={e => column.setFilterValue(e.target.value)}
          className="bg-white h-9 text-xs border-gray-200"
        />
      );
    }
    return null;
  };

  return (
    <div>
      <Header title="Deliveries" />

      {/* Create an Ad-Hoc Delivery / Purchase Order */}
      <Card className="mt-6 overflow-hidden border-0 shadow-none bg-white rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Create an Ad-Hoc Delivery / Purchase Order</CardTitle>
        </CardHeader>
        <CardContent className="bg-[#ECF6FF] mx-6 py-1.5 rounded-l-xl rounded-r-xl">
          <div className="flex items-end justify-between gap-4">
            <div className="flex align-middle">
              <Label htmlFor="product-sku" className="whitespace-nowrap mr-3">Product SKU / EAN / UPC: *</Label>
              <Input id="product-sku" className="bg-white border-gray-200" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="0.00" />
            </div>
            <div className="flex align-middle gap-4">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" className="bg-white border-gray-200" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0.00" />
            </div>
            <Button onClick={handleAddAdHocItem} className="shadow-none bg-transparent text-[#024AFE]">+ Add</Button>
          </div>
        </CardContent>
      </Card>

      {/* Ad-Hoc Delivery / Purchase Order Table */}
      <Card className="mt-6 overflow-hidden border-0 shadow-none bg-white rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Ad-Hoc Delivery / Purchase Order</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#ECF6FF] border-none">
                <TableHead className="p-3 rounded-l-xl">SKU</TableHead>
                <TableHead className="p-3">Quantity</TableHead>
                <TableHead className="p-3">Stock Location</TableHead>
                <TableHead className="p-3">Add to Existing Purchase Order</TableHead>
                <TableHead className="p-3 rounded-r-xl">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adHocItem ? (
                <TableRow key={adHocItem.sku} className="text-[#11263C] text-sm border-b border-gray-200">
                  <TableCell className="p-3 text-start align-top">{adHocItem.sku}</TableCell>
                  <TableCell className="p-3 text-start w-20 align-top">{adHocItem.quantity}</TableCell>
                  <TableCell className="p-3 text-start align-top">
                    <CustomSelect
                      placeholder="Select Location"
                      options={stockLocationOptions}
                      defaultValue={adHocItem.stockLocation}
                      onChange={(value) => handleStockLocationChange(value)}
                      className="w-32 border-gray-200"
                    />
                  </TableCell>
                  <TableCell className="p-3 text-start space-y-2">
                    <h2>No Eligible Order</h2>
                    <div className="grid grid-cols-2 items-center gap-1">
                      <h2>Add Released Order inot Pickwave</h2>
                      <div className="text-end">
                        <Switch />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                      <h2>Select Picker</h2>
                      <div className="text-end">
                        <CustomSelect
                          defaultValue=""
                          placeholder="Please Select Picker"
                          options={[{ id: "umar", label: "Umar", value: "Umar" }]}
                          onChange={() => { }}
                          className="border-gray-200"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-3 text-start align-top">
                    <div className="flex items-center gap-2">
                      <Button variant="primary" className="rounded-lg" size="sm">Complete Ad-Hoc Delivery</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No ad-hoc item added yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Outstanding Orders Section */}
      <Card className="bg-white rounded-2xl border-none shadow-none mt-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Button variant="primary" size="lg" className="rounded-lg font-normal">Book An Outstanding Order</Button>
          <div className="flex items-center gap-2">
            <Button
              variant="filter"
              size="lg"
              className="rounded-lg"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>}
          {error && <div>Error loading orders.</div>}

          {!isLoading && !error && (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id} className="bg-[#ECF6FF] border-none rounded-lg">
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id} className="p-3" style={{ width: header.getSize() }}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
                {/* Filter Row */}
                <TableRow className="border-none rounded-lg">
                  {table.getFlatHeaders().map(header => (
                    <TableHead key={header.id} className="p-3">
                      {header.column.getCanFilter() ? (
                        renderFilter(header.column as Column<OutstandingOrder, any>)
                      ) : null}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={table.getAllColumns().length} className="h-64">
                      <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id} className="text-[#11263C] text-sm border-b border-gray-200">
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} className="p-3 text-start">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={table.getAllColumns().length} className="text-center">
                      No outstanding orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DeliveriesPage; 

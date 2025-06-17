import { useState, useCallback, useEffect } from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { PickwaveStats } from "../components/pickwave-stats";
import { PickwaveTabs } from "../components/pickwave-tabs";
import { Loader2 } from "lucide-react"
import { Header } from "@/components/shared/header"
import { debounce } from 'lodash'
import { useGetOrders } from "../../orders/core/hooks/use-orders";
import { transformToPickwaveOrder } from "../core/order-mapper";
import { usePickwaveOrderColumns as columns } from "../components/pickwave-order-column"
import { PickwaveOrdersTable } from "../components/pickwave-order-table";
import { Button } from "@/components/ui/button";
import { CreatePickwaveModal } from "../components/create-pickwave-modal";

const dummyStats = {
  totalOutstandingOrders: 508,
  totalOpenPickwaves: 2,
  ordersPickedToday: 0,
  ordersPickedLast48Hours: 0,
  ordersPickedLastWeek: 774,
  avgOrdersPerPicker: 0,
  avgTimeToPick: 75,
  ordersRemainingToPick: 0,
};

// Extended query params type to include array parameters
interface ExtendedOrderQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  'warehouse[]'?: string | string[];
  [key: string]: any;
}

export function PickwavePage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchInput);
  }, [searchInput, debouncedSetSearch]);

  // Prepare query parameters
  const queryParams: ExtendedOrderQueryParams = {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchTerm,
    sort: sorting.length > 0 ? sorting[0].id : undefined,
    order: sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : undefined,
  };

  // Handle special cases for filters
  columnFilters.forEach(filter => {
    if (filter.id === 'warehouse') {
      // Handle warehouse as array parameter
      queryParams['warehouse[]'] = Array.isArray(filter.value) ? filter.value : [filter.value];
    } else {
      // Handle other filters as direct parameters
      queryParams[filter.id] = filter.value;
    }
  });

  const { orders: data, isLoading, error } = useGetOrders(queryParams);
  const pendingOrders = data?.orders ? data.orders.filter(order => order.status === "pending") : [];
  const tableData = pendingOrders ? pendingOrders.map(transformToPickwaveOrder) : []

  const table = useReactTable({
    data: tableData,
    columns,
    pageCount: data?.pagination?.pages ?? -1,
    state: {
      columnFilters,
      pagination,
      sorting,
    },
    enableRowSelection: true,
    enableSorting: true,
    manualPagination: true,
    manualSorting: true,
    onColumnFiltersChange: (updaterOrValue) => {
      const filters = typeof updaterOrValue === 'function' 
        ? updaterOrValue(columnFilters)
        : updaterOrValue;
      setColumnFilters(filters);
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const totalOrdersSelected = selectedRows.length;
  const selectedOrderIds = selectedRows.map(row => row.original.id);

  const handleCreatePickwaveClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div>Error loading orders: {(error as Error).message}</div>
  }

  // Calculate total pages
  const totalPages = data?.pagination?.pages || 1
  const currentPage = pagination.pageIndex + 1

  // Handle page change
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))
  }

  return (
    <div>
      <Header title="Pickwave" />

      <div className="mt-6">
        {/* Stats Section */}
        <PickwaveStats stats={dummyStats} />

        {/* Tabs Section */}
        <PickwaveTabs/>

        {/* Table Area */}
        <div className="bg-white rounded-2xl mt-4 p-4 pb-6">
          <Button 
            variant="primary" 
            className="rounded-lg"
            onClick={handleCreatePickwaveClick}
            disabled={totalOrdersSelected === 0}
          >
            Create Pickwave
          </Button>
          <PickwaveOrdersTable
            table={table}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            pagination={pagination}
            data={data}
            columns={columns}
          />
        </div>
      </div>

      <CreatePickwaveModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        totalOrdersSelected={totalOrdersSelected}
        selectedOrderIds={selectedOrderIds}
      />
    </div>
  );
}

export default PickwavePage;
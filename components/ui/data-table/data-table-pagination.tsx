import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Table } from "@tanstack/react-table";
import {
  SelectDefault as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-[12px]">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[110px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 6, 7, 8, 10].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-[16px]">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          <span>
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            -
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              table.getRowModel().rows?.length}
            <span className="text-black-100">
              {" "}
              of {table.getFilteredRowModel().rows.length}
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 disabled:cursor-not-allowed p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <Icons.chevronLeftIcon className="h-2.5 w-2.5" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 disabled:cursor-not-allowed p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <Icons.chevronRightIcon className="h-2.5 w-2.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

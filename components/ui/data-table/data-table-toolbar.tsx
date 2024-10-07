"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "../button";
import { FilterItems } from "../filters/filter-items";
import SearchItems from "../filters/search-items";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  placeholder?: string;
  filterItems: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  showSearch?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  placeholder,
  filterItems,
  showSearch = true,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center ml-auto gap-10">
        <div className="flex items-center gap-6">
          {showSearch && (
            <SearchItems placeholder={placeholder || "Search..."} />
          )}
          {/* <Input
              placeholder={placeholder || "Search..."}
              value={
                (table
                  .getColumn(column_to_search)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(column_to_search)
                  ?.setFilterValue(event.target.value)
              }
              className="pl-5 py-[9px] w-[200px] lg:w-[350px] h-fit bg-transparent rounded-[24px] border-border placeholder:text-gray-400"
            /> */}
        </div>

        <FilterItems
          title={"Sort by"}
          options={filterItems}
          urlParam="filter"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

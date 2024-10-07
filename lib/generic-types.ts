import { AxiosError } from "axios";
import React from "react";
import { ErrorData } from "./http";

export interface GenericResponse<T> {
  data: T;
  statusCode: number;
  message: string;
}

export interface PageInfo {
  totalRows: number;
  page: number;
  pageSize: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export interface NocoQueryResponse<T> {
  list: T[];
  pageInfo: PageInfo;
}

export interface QueryPayload {
  pageSize: number;
  pageNumber: number;
  order: "NEWEST_FIRST" | "OLDEST_FIRST";
  filterJsonUrlEncoded?: string;
}

export interface GenericQueryResponse<T> {
  data: T[];
  status: string;
  message: string;
}

export type FilterOption = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type TableFilter = {
  columnKey: string;
  title: string;
  type: "input" | "select";
  options?: FilterOption[];
  operator?: "ilike" | "eq" | "lte" | "gte" | "gt" | "lt" | "like";
};

export interface DialogProps<T = undefined> {
  data?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type NocoQueryPayload = {
  limit: number;
  offset: number;
  where?: string;
};

export type SharedDataTableProps = {
  queryKey?: string[];
  additionalFilter?: { id: string; value: string }[];
};

export type BookAppointmentDialogProps<T = undefined> = {
  setStep: (direction: "prev" | "next") => void;
  data?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type QueryError = AxiosError<ErrorData>;

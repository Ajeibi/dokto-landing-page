import { ColumnFiltersState } from "@tanstack/react-table";
import { QueryPayload } from "./generic-types";

const getSplitvalues = (value: string) => {
  return value.split("_");
};

export const convertToFilterFormat = (columnFilters: ColumnFiltersState) => {
  const newval = columnFilters.map((val) => {
    if (Array.isArray(val.value)) {
      return { [val.id]: val.value[0] as string };
    }

    if ((val.value as string).includes("_")) {
      const [operand, operator] = getSplitvalues(val.value as string);

      return { [val.id]: { ["$" + operator as string]: operator === "ilike" ? `%25${operand}%25` : operand } };
    }

    return { [val.id]: val.value as string };
  });

  const filter = { filter: { $and: newval } };

  return filter;
};

type Join = {
  [x: string]: string[];
};

interface JoinsObject {
  [key: string]: {
    include: boolean;
    on: {
      [x: string]: string | { [x: string]: string } | boolean;
    };
  };
}

export const constructJoin = (columnFilters: ColumnFiltersState, joins: Join) => {
  if (columnFilters.length) {
    let joinsVar;

    columnFilters.forEach((val) => {
      const transformedJoins: JoinsObject = Object.entries(joins).reduce((acc, [key, value]) => {
        acc[key] = {
          include: true,
          on: value.reduce((onAcc, item) => {
            if (val.id === item) {
              const filterValue = Array.isArray(val.value) ? val?.value[0] as string : val.value as string;
              const [operand, operator] = getSplitvalues(filterValue);

              onAcc[item] = (filterValue).includes("_") ? { ["$" + operator]: operator === "ilike" ? `%25${operand}%25` :  operand } as { [x: string]: string }  : filterValue;
            }

            return onAcc;
          }, {} as { [x: string]: string | { [x: string]: string } | boolean })
        };

        return acc;
      }, {} as JoinsObject);

      joinsVar =  transformedJoins;
    });

    return joinsVar;
  }

  return Object.entries(joins).reduce<{ [key: string]: { include: true } }>((acc, [key]) => {
    acc[key] = { include: true };

    return acc;
  }, {});
};

export const constructQueryPayload = (payload: QueryPayload) => {
  if (payload.filterJsonUrlEncoded === "undefined" || payload.filterJsonUrlEncoded === undefined) {
    return `pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}&order=${payload.order}`;
  }

  return `pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}&order=${payload.order}&filterJsonUrlEncoded=${payload.filterJsonUrlEncoded}`;
};

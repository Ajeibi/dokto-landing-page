import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { getRequest } from "@/lib/http-helpers";
import { useQuery } from "@tanstack/react-query";

export type Transaction = {
    transactionId: string;
    amount: number;
    transactionDate: string;
    source: string;
    transactionType: string;
    state: string;
};

export type WalletInfo = {
    _id: string;
    balance: number;
    user: string;
    __v: number;
    transactions: Transaction[];
};

async function fetchWallet(): Promise<GenericResponse<WalletInfo>> {
    const response = await getRequest<GenericResponse<WalletInfo>>({
        url: API_ENDPOINTS.fetchWallet,
    });

    return response;
}

export function useFetchWallet() {
    return useQuery({
        queryKey: ["fetch-wallet"],
        queryFn: fetchWallet,
    });
}
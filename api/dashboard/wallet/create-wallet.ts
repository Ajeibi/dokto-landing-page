import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { GenericResponse } from "@/lib/generic-types";
import { postRequest } from "@/lib/http-helpers";
import { useMutation } from "@tanstack/react-query";

export type CreateWalletResponse = {
    _id: string;
    userId: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

async function createWallet(): Promise<GenericResponse<CreateWalletResponse>> {
    const { data } = await postRequest<GenericResponse<CreateWalletResponse>, {}>(
        API_ENDPOINTS.createWallet,
        {} //do we need client side data to create the wallet? When I confirm I go revisit this payload stuff
    );
    return data;
}

export function useCreateWallet() {
    return useMutation<GenericResponse<CreateWalletResponse>, Error>({
        mutationFn: createWallet,
    });
}

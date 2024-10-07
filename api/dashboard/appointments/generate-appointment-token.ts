// import { API_ENDPOINTS } from "@/lib/api-endpoints";
// import { GenericResponse } from "@/lib/generic-types";
// import { postRequest } from "@/lib/http-helpers";
// import { AxiosResponse } from "axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { AxiosError } from "axios";

// type UserData = {
//     id: string;
//     role: string;
//     name: string;
// };

// type MeetingTokenResponseData = {
//     token: string;
//     appointmentId: string;
//     uid: string;
//     users: Array<UserData>;
//     appointmentNotes: string;
//     medicalImages: string[];
// };

// export async function generateMeetingToken(appointmentId: string): Promise<MeetingTokenResponseData> {
//     if (!appointmentId) {
//         throw new Error("Appointment ID is required");
//     }

//     const url = API_ENDPOINTS.generateMeetingToken(appointmentId);
//     try {
//         const response: AxiosResponse<GenericResponse<MeetingTokenResponseData>> = await postRequest<
//             GenericResponse<MeetingTokenResponseData>,
//             {}
//         >(url, {});

//         return response.data.data;
//     } catch (error) {
//         console.error("Failed to generate meeting token", error);
//         throw error;
//     }
// }

// export function useGenerateMeetingToken() {
//     const queryClient = useQueryClient();

//     return useMutation<MeetingTokenResponseData, AxiosError, string>({
//         mutationFn: generateMeetingToken,
//         mutationKey: ["generate-meeting-token"],

//         onError(error: unknown) {
//             if (error instanceof AxiosError && error.response) {
//                 console.error(error.response.data);
//             } else {
//                 console.error(error instanceof Error ? error.message : "Unknown error occurred");
//             }
//         },

//         onSuccess(response) {
//             const meetingToken = response.token;
//             if (!meetingToken) {
//                 console.error("Meeting token not found");
//                 return;
//             }

//             console.log("Meeting token generated:", meetingToken);
//             queryClient.setQueryData(["meeting-token"], meetingToken);
//         },

//         retry: 3,
//         retryDelay: 1000,
//     });
// }
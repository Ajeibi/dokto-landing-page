import { QueryPayload } from "./generic-types";
import api from "./http";
import { constructQueryPayload } from "./filter-helpers";

export const getAll = async <T>(params: {
  url: string;
  payload: QueryPayload;
}) => {
  const { data } = await api.get<T>(
    `${params.url}?${constructQueryPayload(params.payload)}`
  );

  return data;
};

export const getRequest = async <T>(params: { url: string }) => {
  const { data } = await api.get<T>(`${params.url}`);

  return data;
};

export const postRequest = async <T, P>(url: string, payload: P) => {
  return await api.post<T>(url, payload);
};

export const patchRequest = async <T, P>(url: string, payload?: P) => {
  return await api.patch<T>(url, payload);
};

// export const patchRequest = async <T, P>(params: {
//   url: string;
//   payload: P;
// }) => {
//   const { data } = await api.patch<T>(params.url, params.payload);

//   return data;
// };

export const putRequest = async <T, P>(params: { url: string; payload: P }) => {
  const { data } = await api.put<T>(params.url, params.payload);

  return data;
};

export const deleteRequest = async <T, P>(params: {
  url: string;
  payload: P;
}) => {
  const { data } = await api.delete<T>(params.url);

  return data;
};

export const uploadImageRequest = async <T, P>(params: {
  url: string;
  payload: P;
}) => {
  const { data } = await api.post<T>(params.url, params.payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

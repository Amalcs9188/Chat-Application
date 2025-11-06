// src/hooks/useGetData.ts
import { paginationStore } from "@src/app/stores/paginationStore";
import { api } from "@src/lib/axios";
import { GetRequestInterface } from "@src/types/common";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { usePaginationParams } from "./usePagination";

interface UseGetDataProps<TData> {
  endpoint: string;
  queryKey: string;
  params?: GetRequestInterface;
  options?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">;
}

export const useGetData = <TData>({
  endpoint,
  queryKey,
  options,
}: UseGetDataProps<TData>) => {
  const params = usePaginationParams(paginationStore);
  return useQuery<TData>({
    queryKey: [
      queryKey,
      params?.offset,
      params?.limit,
      params?.searchTerm,
      params?.operation,
    ],
    queryFn: async () => {
      const response = await api.get<TData>(endpoint, { params });
      return response.data;
    },
    ...options,
  });
};

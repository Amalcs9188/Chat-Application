import { api } from "@src/lib/axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
export type PostResponse = {
  success: boolean;
  message: string;
  operation_type?: string;
  record_id?: number;
};

export type ApiPostResponse<T = PostResponse> = {
  data: T;
};

export interface UseAppMutationOptions<TData, TVariables> {
  endpoint: string;
  method?: "post" | "put" | "delete";
  queryKeyToInvalidate?: string[];
  name?: string;
}

export function useAppMutation<
  TData extends PostResponse = PostResponse,
  TVariables = unknown
>(
  options: UseAppMutationOptions<TData, TVariables>
): UseMutationResult<ApiPostResponse<TData>, Error, TVariables> {
  const queryClient = useQueryClient();

  return useMutation<ApiPostResponse<TData>, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const payload = {
        ...variables,
        createdBy: 0,
      };

      const method = options.method ?? "post";

      const response = await api.request<ApiPostResponse<TData>>({
        url: options.endpoint,
        method,
        data: payload,
      });
      console.log("response", response);
      return response.data;
    },

    onSuccess: (data) => {
      if (options.queryKeyToInvalidate) {
        queryClient.invalidateQueries({
          queryKey: options.queryKeyToInvalidate,
        });
      }
      if (data.data.success) {
        toast.success(`${options.name || "Record"} saved successfully!`);
      } else {
        toast.error(data.data.message || "Operation failed");
      }
    },

    onError: (err: Error) => {
      console.error("mutation error", err);
      toast.error("Something went wrong!");
    },
  });
}

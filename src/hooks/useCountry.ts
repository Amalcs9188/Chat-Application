import { API_ENDPOINTS } from "@src/constants/apiEndPoints";
import { QUERY_KEYS } from "@src/constants/queryKey";
import { CountryGetResponseData } from "@src/types/country";
import { useDeleteMutation } from "./useDeleteMutation";
import { useGetData } from "./useGetData";
import { useAppMutation } from "./useMutationData";

export const useGetAllCountry = () => {
  return useGetData<CountryGetResponseData>({
    endpoint: API_ENDPOINTS.get_countries,
    queryKey: QUERY_KEYS.get_countries,
  });
};

export const useSaveCountry = () => {
  return useAppMutation({
    endpoint: API_ENDPOINTS.save_country,
    method: "post",
    queryKeyToInvalidate: [QUERY_KEYS.get_countries],
    name: "Country",
  });
};

export const useDeleteCountry = () => {
  return useDeleteMutation({
    endpoint: API_ENDPOINTS.delete_country,
    queryKeyToInvalidate: [QUERY_KEYS.get_countries],
    name: "Country",
  });
};

import { API_ENDPOINTS } from "@src/constants/apiEndPoints";
import { api } from "@src/lib/axios";
import { BusinessVerticalResponseData } from "@src/types/busyness_vertical";
import { GetRequestInterface } from "@src/types/common";

export const BusynessVertical_GetAllAPI = async (data: GetRequestInterface) => {
  const response = await api.get<BusinessVerticalResponseData>(
    API_ENDPOINTS.get_busyness_verticals,
    {
      params: data,
    }
  );
  return response.data;
};

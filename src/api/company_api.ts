import { API_ENDPOINTS } from "@src/constants/apiEndPoints";
import { api } from "@src/lib/axios";
import { GetRequestInterface } from "@src/types/common";
import { CompanyGetResponse } from "@src/types/company";

export const Company_GetAllAPI = async (
  data: GetRequestInterface
): Promise<CompanyGetResponse> => {
  console.log("Company Data : ", data);

  const response = await api.get<CompanyGetResponse>(
    API_ENDPOINTS.get_companies,
    {
      params: data,
    }
  );
  console.log("Company Response : ", response);
  return response.data;
};

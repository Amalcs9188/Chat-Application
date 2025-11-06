export interface GetRequestInterface {
  operation: string;
  searchTerm: string;
  limit: number;
  offset: number;
}

export type PostResponse = {
  success: boolean;
  message: string;
  operation_type: string;
  record_id: number;
};

export type ApiGetResponse<T> = {
  total_count: number;
  data: T;
};

export type ApiPostResponse = {
  data: PostResponse;
};

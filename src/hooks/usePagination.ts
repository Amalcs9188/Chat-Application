import { paginationStore } from "@src/app/stores/paginationStore";

export function usePaginationParams(store: typeof paginationStore) {
  const limit = store((state) => state.limit);
  const offset = store((state) => state.offset);
  const searchTerm = store((state) => state.searchTerm);

  return {
    operation: searchTerm.length > 0 ? "BySearch" : "All",
    searchTerm,
    limit,
    offset,
  };
}

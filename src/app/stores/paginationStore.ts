import { create } from "zustand";

export type LimitStore = {
  limit: number;
  offset: number;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
  nextpage: (pageSize: number) => void;
  prevpage: (pageSize: number) => void;
  resetOffset: () => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

export const paginationStore = create<LimitStore>((set) => ({
  limit: 12,
  offset: 0,
  searchTerm: "",
  setLimit: (limit: number) => set({ limit }),
  setOffset: (offset: number) => set({ offset }),
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  nextpage: (pageSize) => set((state) => ({ offset: state.offset + pageSize })),
  prevpage: (pageSize) => set((state) => ({ offset: state.offset - pageSize })),
  resetOffset: () => set({ offset: 0 }),
}));

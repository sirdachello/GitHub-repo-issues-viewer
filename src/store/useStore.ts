import { create } from "zustand";
import { Store } from "@/types";

export const useStore = create<Store>((set) => ({
  activeRepo: null,
  errorMessage: "",
  loading: false,
  data: {
    toDoArray: [],
    inProgressArray: [],
    doneArray: [],
  },
  setActiveRepo: (repo) => set(() => ({ activeRepo: repo })),
  setErrorMessage: (message) => set(() => ({ errorMessage: message })),
  setData: (newData) => set(() => ({ data: newData })),
  setLoading: (loading) => set(() => ({ loading })),
}));

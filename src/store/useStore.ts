import { create } from "zustand";
import { Issue } from "@/types";

interface Store {
  activeRepo: string[] | null;
  errorMessage: string;
  data: {
    toDoArray: Issue[];
    inProgressArray: Issue[];
    doneArray: Issue[];
  };
  setActiveRepo: (repo: string[]) => void;
  setErrorMessage: (message: string) => void;
  setData: (newData: { toDoArray: Issue[]; inProgressArray: Issue[]; doneArray: Issue[] }) => void;

}

export const useStore = create<Store>((set) => ({
  activeRepo: null,
  errorMessage: "",
  activeCard: null,
  position: {x: 0, y: 0},
  data: {
    toDoArray: [],
    inProgressArray: [],
    doneArray: [],
  },
  setActiveRepo: (repo) => set(() => ({ activeRepo: repo })),
  setErrorMessage: (message) => set(() => ({ errorMessage: message })),
  setData: (newData) => set(() => ({ data: newData })),
}));

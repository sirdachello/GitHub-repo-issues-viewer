import { create } from "zustand";

interface Store {
    activeRepo: string[] | null;
    errorMessage: string;
    data: unknown[];
    setActiveRepo: (repo: string[]) => void;
    setErrorMessage: (message: string) => void;
    setData: (data: unknown[]) => void;
}

export const useStore = create<Store>((set) => ({
    activeRepo: null,
    errorMessage: '',
    data: [],
    setActiveRepo: (repo) => set({ activeRepo: repo }),
    setErrorMessage: (message) => set({ errorMessage: message }),
    setData: (data) => set({ data }),
}))

type Issue = {
    id: string;
    state: string;
    title: string;
    body: string;
    assignee: string | null;
    assignees: string[];
    html_url: string;
  };
  
  type RepoIssues = Issue[];

  type AllRepos = {
    [key: string]: RepoIssues;
  };

  interface AppState {
    allRepos: AllRepos;
    addRepo: (link: string, issues: RepoIssues) => void;
    updateIssue: (repoLink: string, issueId: string, updateIssue: Partial<Issue>) => void;
  }
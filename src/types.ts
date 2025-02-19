type Issue = {
  id: string | number;
  state: 'open' | 'closed';
  title: string;
  body: string | null;
  assignee: object | null;
  assignees: [object] | [];
  html_url: string;
};
type IssueColumnProps = {
  title: string;
  status: string;
  dataToShow: string;
};

type IssueCardProps = {
  issue: Issue;
  status: string;
  dataIndex: string | number;
};

interface Store {
  activeRepo: string[] | null;
  errorMessage: string;
  loading: boolean;
  data: {
    toDoArray: Issue[];
    inProgressArray: Issue[];
    doneArray: Issue[];
  };
  setActiveRepo: (repo: string[]) => void;
  setErrorMessage: (message: string) => void;
  setData: (newData: { toDoArray: Issue[]; inProgressArray: Issue[]; doneArray: Issue[] }) => void;
  setLoading: (loading: boolean) => void;
}


export type { Issue, IssueColumnProps, IssueCardProps, Store };

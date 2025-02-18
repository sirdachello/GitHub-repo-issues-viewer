type Issue = {
  id: string;
  state: 'open' | 'closed';
  title: string;
  body: string;
  assignee: string | null;
  assignees: string[];
  html_url: string;
};

type AllRepos = {
  [key: string]: Issue[];
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

export type { Issue, AllRepos, IssueColumnProps, IssueCardProps };

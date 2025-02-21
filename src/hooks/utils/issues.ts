import { Issue } from "@/types";

function inProgressFilter(issue: Issue): boolean {
  return (
    issue.state === "open" &&
    issue.assignee !== null &&
    issue.assignees.length !== 0
  );
}

function doneFilter(issue: Issue): boolean {
  return issue.state === "closed";
}

function findDifferentElements(
  myStoredArray: Issue[],
  githubArray: Issue[]
): Issue[] {
  return githubArray.filter(
    (githubArrayElem) =>
      !myStoredArray.some(
        (myStoredArrayElem) => myStoredArrayElem.id == githubArrayElem.id
      )
  );
}

function sortIssues(issues: Issue[]) {
  const sortedIssues: {
    toDoArray: Issue[];
    inProgressArray: Issue[];
    doneArray: Issue[];
  } = {
    toDoArray: [],
    inProgressArray: [],
    doneArray: [],
  };

  issues.forEach((issue: Issue) => {
    const issueItem: Issue = {
      id: issue.id,
      state: issue.state,
      title: issue.title,
      body: issue.body,
      assignee: issue.assignee,
      assignees: issue.assignees,
      html_url: issue.html_url,
    };

    if (doneFilter(issueItem)) {
      sortedIssues.doneArray.push(issueItem);
    } else if (inProgressFilter(issueItem)) {
      sortedIssues.inProgressArray.push(issueItem);
    } else sortedIssues.toDoArray.push(issueItem);
  });

  return sortedIssues;
}

export { inProgressFilter, doneFilter, findDifferentElements, sortIssues };

import { useStore } from "@/store/useStore";

import { findDifferentElements, sortIssues } from "../components/utils/issues";

export function useGitHubData() {
  const { setData, setErrorMessage, setActiveRepo, setLoading } = useStore();

  async function loadData(url: string) {
    setLoading(true);
    setErrorMessage("");
    //Make sure the link is valid
    const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)/;
    const match = url.match(regex);

    if (match) {
      //get items from localStorage before fetch call (test if the bug persists);
      //very interesting bug where localStorage returns empty arrays after fetch??????
      const existingListing = localStorage.getItem(url);

      // set up clickable links to the repo and the owner
      const owner = match[1];
      const repoName = match[2];
      setActiveRepo([owner, repoName]);

      const APIurl = `https://api.github.com/repos/${owner}/${repoName}/issues?state=all`;

      const response = await fetch(APIurl);
      const result = await response.json();

      if (result.message === "Not Found") {
        setErrorMessage("Repository not found!");
        setLoading(false);
        return;
      }
      if (existingListing !== null) {
        const parsedExistingListing = JSON.parse(existingListing);
        const deconstructedExistingListing = [
          ...(parsedExistingListing.toDoArray || []),
          ...(parsedExistingListing.inProgressArray || []),
          ...(parsedExistingListing.doneArray || []),
        ];
        const differentElements = findDifferentElements(
          deconstructedExistingListing,
          result
        );

        if (differentElements.length !== 0) {
          //github fetch returned a new issue
          const sortedIssues = sortIssues(differentElements);
          const combinedIssues = {
            toDoArray: [
              ...parsedExistingListing.toDoArray,
              ...sortedIssues.toDoArray,
            ],
            inProgressArray: [
              ...parsedExistingListing.inProgressArray,
              ...sortedIssues.inProgressArray,
            ],
            doneArray: [
              ...parsedExistingListing.doneArray,
              ...sortedIssues.doneArray,
            ],
          };
          localStorage.setItem(url, JSON.stringify(combinedIssues));
          setData(combinedIssues);
        } else {
          //github fetch DID NOT return a new issue
          setData(parsedExistingListing);
        }
      } else {
        //had no previous fetch on this URL
        const sortedIssue = sortIssues(result);
        localStorage.setItem(url, JSON.stringify(sortIssues(result)));
        setData(sortedIssue);
      }
    } else {
      setErrorMessage(
        `Please, enter a valid repository link. Format: "https://github.com/owner/repository-name"`
      );
    }
    setLoading(false);
  }
  return { loadData };
}

import { useStore } from "@/store/useStore";

export default async function loadData(url: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(regex);
    if (match) {
      const { setErrorMessage, setActiveRepo, setData } = useStore.getState();
      setErrorMessage("");
      const owner = match[1];
      const repoName = match[2];
      setActiveRepo([owner, repoName]);

      const APIurl = `https://api.github.com/repos/${owner}/${repoName}/issues?state=all`;
      const result = await (await fetch(APIurl)).json();
      if (result.message === "Not Found") {
        setErrorMessage("Repository not found!");
      } else {
        setData(result);
      }
    } else {
        useStore.getState().setErrorMessage(
        `Please, enter a valid repository link. Format: "https://github.com/owner/repository-name"`
      );
    }
  }
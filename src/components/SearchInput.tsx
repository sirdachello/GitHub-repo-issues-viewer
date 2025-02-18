import { FormEvent, useRef } from "react";

import {
  Container,
  Stack,
  Input,
  Button,
  Breadcrumb,
  Link,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { LiaSlashSolid } from "react-icons/lia";

import { useStore } from "../store/useStore";

import { Issue } from "@/types";

const inProgressFilter = (issue: Issue) =>
  issue.state === "open" &&
  issue.assignee !== null &&
  issue.assignees.length !== 0;
const doneFilter = (issue: Issue) => issue.state === "closed";

function findDifferentElements(
  myStoredArray: Issue[],
  githubArray: Issue[]
): Issue[] {
  const differentElements = githubArray.filter(
    (githubArrayElem) =>
      !myStoredArray.some(
        (myStoredArrayElem) => myStoredArrayElem.id == githubArrayElem.id
      )
  );
  return differentElements;
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

export default function SearchInput() {
  const linkInput = useRef<HTMLInputElement>(null);
  const { activeRepo, setActiveRepo, errorMessage, setErrorMessage, setData } =
    useStore();

  async function loadData(e: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const url = linkInput.current?.value;
    const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)/;
    const match = url?.match(regex);
    if (match && url) {
      const existingListing = localStorage.getItem(url);
      setErrorMessage("");
      const owner = match[1];
      const repoName = match[2];
      setActiveRepo([owner, repoName]);
      
      const APIurl = `https://api.github.com/repos/${owner}/${repoName}/issues?state=all`;
      // very interesting bug where localStorage retuns empty arrays after fetch??????
      const response = await fetch(APIurl);
      const result = await response.json();
      if (result.message === "Not Found") {
        setErrorMessage("Repository not found!");
        return
      } else {
        
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
            setData(parsedExistingListing);
          }
        } else {
          localStorage.setItem(url, JSON.stringify(sortIssues(result)));
          setData(sortIssues(result));
        }
      }
    } else {
      setErrorMessage(
        `Please, enter a valid repository link. Format: "https://github.com/owner/repository-name"`
      );
    }
  }

  return (
    <Container maxW={"1600px"}>
      <form onSubmit={(e) => loadData(e)}>
        <Stack direction={"row"} alignItems="start">
          <Field invalid={errorMessage ? true : false} errorText={errorMessage}>
            <Input onKeyDown={(e) => e.key === 'Enter' && loadData(e)} ref={linkInput} placeholder="GitHub Repo URL"></Input>
          </Field>
          <Button type="submit">Load Issues</Button>
        </Stack>
        {!errorMessage && activeRepo && (
          <Breadcrumb.Root my={"10px"} mx={"10px"}>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Link href={`https://github.com/${activeRepo[0]}`}>
                  {activeRepo[0]}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <LiaSlashSolid />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Link
                  href={`https://github.com/${activeRepo[0]}/${activeRepo[1]}`}
                >
                  {activeRepo[1]}
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        )}
      </form>
    </Container>
  );
}

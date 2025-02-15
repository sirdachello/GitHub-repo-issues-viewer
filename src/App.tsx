import { useStore } from "./store/useStore";
import {
  Button,
  Container,
  Flex,
  Input,
  Link,
  Stack,
  Breadcrumb,
  HStack,
  Heading,
  Text,
  Card,
  Grid,
  GridItem,
  Wrap,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import "./App.css";
import { useRef, useState } from "react";
import { LiaSlashSolid } from "react-icons/lia";

function App() {
  const [activeRepo, setActiveRepo] = useState<string[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const linkInput = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<unknown[]>([]);

  async function loadData() {
    const url = linkInput.current?.value;
    // eslint-disable-next-line no-useless-escape
    const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url?.match(regex);
    if (match) {
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
      setErrorMessage(
        `Please, enter a valid repository link. Format: "https://github.com/owner/repository-name"`
      );
    }
  }

  return (
    <>
      <Container maxW={"1600px"}>
        <Stack direction={"row"} alignItems="start">
          <Field invalid={errorMessage ? true : false} errorText={errorMessage}>
            <Input ref={linkInput} placeholder="GitHub Repo URL"></Input>
          </Field>
          <Button onClick={loadData}>Load Issues</Button>
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
      </Container>
      <Container maxW={"1600px"} my={'20px'}>
        <Wrap justify={'center'}>
          <Stack minW={'300px'} w={'30%'}>
            <Heading>ToDo</Heading>
            {data &&
              data
                .filter(
                  (issue) =>
                    issue.state === "open" &&
                    issue.assignee === null &&
                    issue.assignees.length === 0
                )
                .map((issue) => {
                  return (
                    <Card.Root key={issue.id} backgroundColor={'blackAlpha.300'}>
                      <Card.Header>Title: {issue.title}</Card.Header>
                      <Card.Body><Text lineClamp="4">Description: {issue.body ? issue.body : "<blank>"}</Text></Card.Body>
                      <Card.Footer justifyContent={"end"}>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={issue.html_url}
                        >
                          <Button>View</Button>
                        </a>
                      </Card.Footer>
                    </Card.Root>
                  );
                })}
          </Stack>
          <Stack minW={'300px'} w={'30%'}>
            <Heading>In Progress</Heading>
            {data &&
              data
                .filter(
                  (issue) =>
                    issue.state === "open" &&
                    issue.assignee !== null &&
                    issue.assignees.length !== 0
                )
                .map((issue) => {
                  return (
                    <Card.Root key={issue.id} backgroundColor={'blackAlpha.300'}>
                      <Card.Header>Title: {issue.title}</Card.Header>
                      <Card.Body><Text lineClamp="4">Description: {issue.body ? issue.body : "<blank>"}</Text></Card.Body>
                      <Card.Footer justifyContent={"end"}>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={issue.html_url}
                        >
                          <Button>View</Button>
                        </a>
                      </Card.Footer>
                    </Card.Root>
                  );
                })}
          </Stack>
          <Stack minW={'300px'} w={'30%'}>
            <Heading>Done</Heading>
            {data &&
              data
                .filter((issue) => issue.state === "closed")
                .map((issue) => {
                  return (
                    <Card.Root key={issue.id} backgroundColor={'blackAlpha.300'}>
                      <Card.Header>Title: {issue.title}</Card.Header>
                      <Card.Body><Text lineClamp="4">Description: {issue.body ? issue.body : "<blank>"}</Text></Card.Body>
                      <Card.Footer justifyContent={"end"}>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={issue.html_url}
                        >
                          <Button>View</Button>
                        </a>
                      </Card.Footer>
                    </Card.Root>
                  );
                })}
          </Stack>
          </Wrap>
      </Container>
    </>
  );
}

export default App;

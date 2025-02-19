import { FormEvent, useRef } from "react";
import { useStore } from "../store/useStore";

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
import { useGitHubData } from "@/hooks/useGitHubData";

export default function SearchInput() {
  const linkInput = useRef<HTMLInputElement>(null);
  const { activeRepo, errorMessage, loading } = useStore();
  const {loadData} = useGitHubData();

  function handleSubmit(e: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const url = linkInput.current?.value;
    if (url) {
      loadData(url)
    }
  }


  return (
    <Container maxW={"1600px"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack direction={"row"} alignItems="start">
          <Field invalid={errorMessage ? true : false} errorText={errorMessage}>
            <Input
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              ref={linkInput}
              placeholder="GitHub Repo URL"
            ></Input>
          </Field>
          <Button type="submit" loading={loading}>Load Issues</Button>
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

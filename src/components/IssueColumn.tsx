import { Heading, Stack } from "@chakra-ui/react";
import IssueCard from "./IssueCard";
import { Issue, IssueColumnProps } from "@/types";
import { Droppable } from "@hello-pangea/dnd";
import { useStore } from "@/store/useStore";

export default function IssueColumn({
  title,
  dataToShow,
  status,
}: IssueColumnProps) {
  const { data } = useStore();
  const issues = data[dataToShow as keyof typeof data];
  return (
    <Stack gap={0} minW={"200px"} w={"30%"}>
      <Heading p={'1rem'} borderRadius={'0.3rem 0.3rem 0 0'} mb={0} backgroundColor={"#18181b"} color={'whiteAlpha.900'} textAlign={'center'}>{title}</Heading>
      <Droppable droppableId={dataToShow}>
        {(provided) => {
          return (
            <Stack p={'25px'} ref={provided.innerRef} {...provided.droppableProps} gap={0} boxSizing={'border-box'} border={'1px solid ##18181b'} backgroundColor={"#F6DED8"} minH={'500px'} borderRadius={'0 0 0.3rem 0.3rem'}>
              {issues.map((issue: Issue, index: number) => (
                <IssueCard
                  issue={issue}
                  status={status}
                  key={issue.id}
                  dataIndex={index}
                />
              ))}
              {provided.placeholder}
            </Stack>
          );
        }}
      </Droppable>
    </Stack>
  );
}

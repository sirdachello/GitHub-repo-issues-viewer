import { useStore } from "@/store/useStore";
import { IssueColumnProps } from "@/types";

import { Droppable } from "@hello-pangea/dnd";

import { Heading, Spinner, Stack } from "@chakra-ui/react";
import IssueCard from "./IssueCard";

export default function IssueColumn({
  title,
  dataToShow,
  status,
}: IssueColumnProps) {
  const { data, activeRepo } = useStore();
  const issues = data[dataToShow as keyof typeof data];
  const { loading } = useStore();
  return (
    <Stack gap={0} minW={"320px"} w={"30%"}>
      <Heading
        p={"1rem"}
        borderRadius={"0.3rem 0.3rem 0 0"}
        mb={0}
        bg={"#18181b"}
        color={"whiteAlpha.900"}
        textAlign={"center"}
      >
        {title}
      </Heading>
      <Droppable droppableId={dataToShow}>
        {(provided) => {
          return (
            <Stack
              p={"25px"}
              ref={provided.innerRef}
              {...provided.droppableProps}
              // prevents DnD gap-collapse bug
              gap={0}
              boxSizing={"border-box"}
              border="1px solid #18181b"
              bg={"#F6DED8"}
              borderRadius={"0 0 0.3rem 0.3rem"}
              textAlign={"center"}
            >
              {loading ? (
                <Spinner marginBottom={"10px"} alignSelf={"center"} size="md" />
              ) : (
                <>
                  {issues.length !== 0
                    ? issues.map((issue, index) => (
                        <IssueCard
                          issue={issue}
                          status={status}
                          key={issue.id}
                          dataIndex={index}
                        />
                      ))
                    : activeRepo
                    ? `No "${title}" issues!`
                    : "Selected repository required!"}
                </>
              )}
              {provided.placeholder}
            </Stack>
          );
        }}
      </Droppable>
    </Stack>
  );
}

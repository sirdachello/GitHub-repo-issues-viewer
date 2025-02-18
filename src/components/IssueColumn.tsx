import { Heading, Stack } from "@chakra-ui/react";
import IssueCard from "./IssueCard";
import { Issue, IssueColumnProps } from "@/types";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function IssueColumn({ title, dataToShow, status }: IssueColumnProps) {

  return (
    <Stack minW={"200px"} w={"30%"}>
      <Heading>{title}</Heading>
      <SortableContext items={dataToShow} strategy={verticalListSortingStrategy}>
      {dataToShow.map((issue: Issue, index) => (
        <IssueCard issue={issue} status={status} key={issue.id} dataIndex={index} />
      ))}
      </SortableContext>
    </Stack>
  );
}

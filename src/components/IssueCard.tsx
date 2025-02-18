import { Heading, Text } from "@chakra-ui/react";
import { IssueCardProps } from "@/types";
import "./styles/cardItem.css";
import { Draggable } from "@hello-pangea/dnd";

export default function IssueCard({
  issue,
  status,
  dataIndex,
}: IssueCardProps) {
  
  // after a few hours trying to figuring out what causes such lag during
  // implementation of drag-n-drop,
  // it was discovered that Chakra UI was the culprit :)
  // aka skill issue

  return (
    <Draggable draggableId={String(issue.id)} index={Number(dataIndex)}>
      {(provided) => {
        return (
          <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
            className="card-item"
            data-order={Number(dataIndex) + 1}
            data-status={status}
          >
            <Heading textStyle={'lg'} lineClamp={'1'} className="card-header">
              {issue.title}
            </Heading>
            <Text textStyle={'md'} lineClamp={'3'} textAlign={'justify'}>
              {issue.body}
            </Text>
            <div className="card-footer">
            <a target="_blank" rel="noopener noreferrer" href={issue.html_url}>
              <button className="card-button">View</button>
            </a>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

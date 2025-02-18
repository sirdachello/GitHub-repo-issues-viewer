import { Text } from "@chakra-ui/react";
import { IssueCardProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function IssueCard({ issue, status, dataIndex  }: IssueCardProps) {
  const id = issue.id;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

    const style = transform? {
      transform: `translate(${transform.x}px, ${transform.y}px)`
    } : undefined;
  // const style = {
  //   transition,
  //   transform: CSS.Transform.toString(transform),
  //   // boxSizing: 'border-box',
  //   // border: '1px solid black',
  //   // backgroundColor: "orangered",
  //   // borderRadius: '10px',
  //   // padding: "15px",
  // };

  // after a few hours trying to figuring out what causes such lag during
  // implementation of drag-n-drop,
  // it was discovered that Chakra UI was the culprit :)
  // aka skill issue

  return (
    <div
      className="card-item"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      data-index={dataIndex}
    >
      <h3 className="card-header">{issue.title}</h3>
      <Text lineClamp="4" fontSize={"1rem"}>
        {issue.body}
      </Text>
      <a target="_blank" rel="noopener noreferrer" href={issue.html_url}>
        <button className="card-button">View</button>
      </a>
    </div>
    // <Card.Root
    //   ref={setNodeRef}
    //   {...attributes}
    //   {...listeners}
    //   style={style}
    //   className="card-item"
    //   data-index={dataIndex}
    //   boxSizing={'border-box'}
    //   backgroundColor={"orangered"}
    // >
    //   <Card.Header fontSize={'1.25rem'}>Title: {issue.title}</Card.Header>
    //   <Card.Body>
    //     <Text lineClamp="4" fontSize={'1rem'}>
    //       Description: {issue.body ? issue.body : "<blank>"}
    //     </Text>
    //   </Card.Body>
    //   <Card.Footer justifyContent={"end"}>
    //     <a target="_blank" rel="noopener noreferrer" href={issue.html_url}>
    //       <Button>View</Button>
    //     </a>
    //   </Card.Footer>
    // </Card.Root>
  );
}

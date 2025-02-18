import { Container, Wrap } from "@chakra-ui/react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import IssueColumn from "./components/IssueColumn";
import { useStore } from "./store/useStore";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect } from "react";

export default function App() {
  const { data, setData } = useStore();



  function swapById(data, id1, id2) {
    function swapArray(arr, id1, id2) {
      const index1 = arr.findIndex(item => item.id === id1);
      const index2 = arr.findIndex(item => item.id === id2);

      if (index1 === -1 || index2 === -1) return false;
      [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
      return true;
    }

    const arrays = ['toDoArray', 'inProgressArray', 'doneArray'];

    for (let array of arrays) {
      const swapped = swapArray(data[array], id1, id2);
      if (swapped) {
        setData({ ...data });
        return true;
      }
    }
    return false;
  }
  
  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if(!over) return;
    const issueID = active.id as string;
    const overID = over.id as string;
    if (issueID !== overID) {
      swapById(data, issueID, overID);
    }
  }
  return (
    <>
      <SearchInput />
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Container maxW={"1600px"} my={"20px"}>
          <Wrap justify={"center"}>
            <IssueColumn title={"ToDo"} status={'open'} dataToShow={data.toDoArray} />
            <IssueColumn
              title={"In Progress"}
              status={'progress'}
              dataToShow={data.inProgressArray}
            />
            <IssueColumn title={"Done"} status={'done'} dataToShow={data.doneArray} />
          </Wrap>
        </Container>
      </DndContext>
    </>
  );
}

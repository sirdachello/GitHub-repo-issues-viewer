import { useEffect } from "react";
import { useStore } from "./store/useStore";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import "./App.css";

import { Container, Wrap } from "@chakra-ui/react";
import SearchInput from "./components/SearchInput";
import IssueColumn from "./components/IssueColumn";

export default function App() {
  const { activeRepo, data, setData } = useStore();

  // localstorage update after dnd
  useEffect(() => {
    if (!activeRepo) return;
    const url = `https://github.com/${activeRepo[0]}/${activeRepo[1]}`;
    localStorage.setItem(url, JSON.stringify(data));
  }, [data, activeRepo]);


  function handleDragEnd(event: DropResult) {
    const {source, destination} = event;
    //outside
    if (!destination) return;

    const sourceArrayName = source.droppableId as keyof typeof data;
    const destinationArrayName = destination.droppableId as keyof typeof data;
    //on self
    if (source.index === destination.index && sourceArrayName === destinationArrayName) return;

    //else
    repositionItem(sourceArrayName, destinationArrayName, source.index, destination.index);
  }

  function repositionItem(sourceName: keyof typeof data, destinationName: keyof typeof data, sourceIndex: number, destinationIndex: number) {

    const sourceArrayCopy = structuredClone(data[sourceName]);
    const destinationArrayCopy = sourceName === destinationName? sourceArrayCopy : structuredClone(data[destinationName])
    const [movedItem] = sourceArrayCopy.splice(sourceIndex, 1);

    destinationArrayCopy.splice(destinationIndex, 0, movedItem);

    setData({
      ...data,
      [sourceName]: sourceArrayCopy,
      [destinationName]: destinationArrayCopy
    });
  }


  return (
    <>
      <SearchInput />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container maxW={"1600px"} my={"20px"}>
          <Wrap justify={"center"}>
            <IssueColumn
              title={"ToDo"}
              status={"open"}
              dataToShow={"toDoArray"}
            />
            <IssueColumn
              title={"In Progress"}
              status={"progress"}
              dataToShow={"inProgressArray"}
            />
            <IssueColumn
              title={"Done"}
              status={"done"}
              dataToShow={"doneArray"}
            />
          </Wrap>
        </Container>
      </DragDropContext>
    </>
  );
}
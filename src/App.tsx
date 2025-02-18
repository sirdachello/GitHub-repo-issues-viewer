import { Container, Wrap } from "@chakra-ui/react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import IssueColumn from "./components/IssueColumn";
import { useStore } from "./store/useStore";
import { DragDropContext} from '@hello-pangea/dnd';
import { useEffect } from "react";

export default function App() {
  const { activeRepo, data, setData } = useStore();

  useEffect(() => {
    if(!activeRepo) return;
    const url = `https://github.com/${activeRepo[0]}/${activeRepo[1]}`
    localStorage.setItem(url, JSON.stringify(data))
  }, [data, activeRepo])


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleDragEnd(e: any) {
    const sourceIndex = e.source.index;
    const targetIndex = e.destination.index;
    const sourceArrayName = e.source.droppableId as keyof typeof data;
    const targetArrayName = e.destination.droppableId as keyof typeof data;
    // dropping the item on itself
    if (sourceIndex === targetIndex && sourceArrayName === targetArrayName) return
    // dropping the item on the same column, but different index
    if (sourceIndex !== targetIndex && sourceArrayName === targetArrayName) {
      const targetArrayCopy = structuredClone(data[targetArrayName]);
      const [movedItem] = targetArrayCopy.splice(sourceIndex, 1);
      targetArrayCopy.splice(targetIndex, 0, movedItem);
      setData({...data, [targetArrayName]: targetArrayCopy})
      return
    }
    //dropping item into a different column
    if (sourceArrayName !== targetArrayName) {
      const sourceArrayCopy = structuredClone(data[sourceArrayName]);
      const targetArrayCopy = structuredClone(data[targetArrayName]);
      const [movedItem] = sourceArrayCopy.splice(sourceIndex, 1);
      targetArrayCopy.splice(targetIndex, 0, movedItem);
      setData({...data, [targetArrayName]: targetArrayCopy, [sourceArrayName]: sourceArrayCopy})
    }
  }

  return (
    <>
      <SearchInput />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container maxW={"1600px"} my={"20px"}>
          <Wrap justify={"center"}>
            <IssueColumn title={"ToDo"} status={'open'} dataToShow={'toDoArray'} />
            <IssueColumn
              title={"In Progress"}
              status={'progress'}
              dataToShow={'inProgressArray'}
            />
            <IssueColumn title={"Done"} status={'done'} dataToShow={'doneArray'} />
          </Wrap>
        </Container>
        </DragDropContext>
    </>
  );
}










  // function swapById(data, id1, id2) {
  //   function swapArray(arr, id1, id2) {
  //     const index1 = arr.findIndex(item => item.id === id1);
  //     const index2 = arr.findIndex(item => item.id === id2);

  //     if (index1 === -1 || index2 === -1) return false;
  //     [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  //     return true;
  //   }

  //   const arrays = ['toDoArray', 'inProgressArray', 'doneArray'];

  //   for (let array of arrays) {
  //     const swapped = swapArray(data[array], id1, id2);
  //     if (swapped) {
  //       setData({ ...data });
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  
  // function handleDragEnd(e: DragEndEvent) {
  //   const { active, over } = e;
  //   if(!over) return;
  //   const issueID = active.id as string;
  //   const overID = over.id as string;
  //   if (issueID !== overID) {
  //     swapById(data, issueID, overID);
  //   }
  // }
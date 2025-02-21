import { vi } from "vitest"; // Import vi from vitest
import { render, screen } from "@testing-library/react";
import IssueColumn from "@/components/IssueColumn";
import { Provider } from "@/components/ui/provider";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "@testing-library/jest-dom"

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("IssueColumn", () => {
  it("should render a correct title", () => {
    render(
      <Provider>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="test-droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <IssueColumn title="ToDo" status="open" dataToShow="toDoArray" />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Provider>
    );

    const heading = screen.getByRole('heading');
    const divElement = screen.getByText("Selected repository required!");
    expect(heading).toBeInTheDocument();
    expect(divElement).toBeInTheDocument();
    expect(heading).toHaveTextContent('ToDo');
  });
});

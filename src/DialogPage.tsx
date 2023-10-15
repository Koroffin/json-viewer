import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DialogContainer } from "./DialogContainer";
import { DialogForm } from "./DialogForm";

export const DialogPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DialogContainer />
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0 }}>
        <DialogForm />
      </div>
    </DndProvider>
  );
};

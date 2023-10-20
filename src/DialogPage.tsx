import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DialogContainer, DialogForm, DialogSaveButton } from "@arbuzalchemy/dialog-tree";

export const DialogPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DialogContainer />
      <div style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", position: "fixed", left: 0, right: 0, bottom: 0, backgroundColor: "white" }}>
        <DialogForm />
      </div>
      <DialogSaveButton />
    </DndProvider>
  );
};

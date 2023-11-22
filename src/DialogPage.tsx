import styled from '@emotion/styled';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DialogContainer, DialogForm, DialogSaveButton } from "@arbuzalchemy/dialog-tree";

const BottomBar = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

export const DialogPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DialogContainer />
      <BottomBar>
        <DialogForm />
      </BottomBar>
      <DialogSaveButton />
    </DndProvider>
  );
};
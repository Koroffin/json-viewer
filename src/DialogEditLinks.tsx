import { Control } from "react-hook-form";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, DeleteButton, FormInputSelect, FormInputText } from "@arbuzalchemy/common-ui";

import { dialogStore } from "./state";

export const DialogEditLinks = ({
  next,
  control,
  addNodeNext,
  deleteNodeNext,
}: {
  next: DialogNode["next"];
  control: Control<DialogNode, any>;
  addNodeNext: () => void;
  deleteNodeNext: (index: number) => void;
}) => {
  return (
    <>
      {next.map(({ to, value }, index) => (
        <div key={index} style={{ position: "relative" }}>
          <Box>
            <FormInputSelect
              label="To"
              name={`next.${index}.to`}
              control={control}
              options={dialogStore.options}
            />
          </Box>
          <Box>
            <FormInputText
              label="Text"
              name={`next.${index}.value`}
              control={control}
            />
          </Box>
          <DeleteButton onClick={() => {
            deleteNodeNext(index);
            control.unregister(`next.${index}.to`);
            control.unregister(`next.${index}.value`);
          }}>
            <DeleteIcon />
          </DeleteButton>
        </div>
      ))}
      <Box>
        <Button variant="contained" onClick={addNodeNext}>
          Add Link
        </Button>
      </Box>
    </>
  );
};

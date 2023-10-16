import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { dialogStore } from "./state";
import { FormInputText } from "./FormInputText";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { Box } from "./Box";
import { DialogEditLinks } from "./DialogEditLinks";

const Form = styled.form`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.5);
  background-color: white;
  z-index: 10;
  width: 500px;
`;

export const DialogEditForm = observer(() => {
  const dialog = dialogStore.editingNode;

  const onSubmit: SubmitHandler<DialogNode> = useCallback(
    (data) => {
      dialogStore.updateNodeText(dialog!.id, data.text);
      dialogStore.updateNodeNext(dialog!.id, data.next);
      dialogStore.setEditingNode(null);
    },
    [dialog],
  );

  const addNodeNext = useCallback(() => {
    dialogStore.addNodeNext(dialog!.id);
  }, [dialog]);

  const { handleSubmit, control, setValue } = useForm<DialogNode>({
    defaultValues: dialog || {},
  });

  useEffect(() => {
    if (dialog) {
      setValue("text", dialog.text);
      setValue("next", dialog.next);
    }
  }, [dialog, setValue]);

  if (dialog === null) {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <FormInputText label="Text" name="text" control={control} multiline />
      </Box>

      <Box>
        <Typography variant="h6">Links</Typography>
      </Box>
      <DialogEditLinks next={dialog.next} control={control} blacklistedIds={[ dialog.id ]} addNodeNext={addNodeNext} />

      <Box>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Form>
  );
});

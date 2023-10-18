import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { Button, Stack, Typography } from "@mui/material";
import { Box, FormInputText } from "@arbuzalchemy/common-ui";

import { dialogStore } from "./state";
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
  const deleteNodeNext = useCallback((index: number) => {
    dialogStore.deleteNodeNext(dialog!.id, index);
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
      <DialogEditLinks deleteNodeNext={deleteNodeNext} next={dialog.next} control={control} addNodeNext={addNodeNext} />

      <Box>
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button variant="contained" color="error" onClick={() => {
            dialogStore.deleteNode(dialog.id);
            dialogStore.setEditingNode(null);
          }}>
            Delete
          </Button>
        </Stack>
      </Box>
    </Form>
  );
});

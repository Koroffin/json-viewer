import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { FormInputText } from "@arbuzalchemy/common-ui";

import { questsStore } from "./state";


export const QuestForm = ({ quest }: { quest: Quest }) => {
  const { handleSubmit, control } = useForm<Quest>({
    defaultValues: quest,
  });

  const onSubmit: SubmitHandler<Quest> = (data) =>
    questsStore.updateQuest(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <FormInputText label="Name" name="name" control={control} />
      </Box>

      <Box>
        <FormInputText
          label="Description"
          name="description"
          control={control}
          multiline
        />
      </Box>

      <Box>
        <FormInputText label="Objective" name="objective" control={control} />
      </Box>

      <Box>
        <FormInputText label="Hints" name="hints" control={control} />
      </Box>

      {quest.steps.map((step, index) => (
        <Box key={index}>
          <FormInputText
            label={`Step ${index + 1}`}
            name={`steps[${index}].text` as any}
            control={control}
          />
        </Box>
      ))}
      <Box>
        <FormInputText
          label="Closing Text"
          name="closing_text"
          control={control}
        />
      </Box>

      <Box>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </form>
  );
};

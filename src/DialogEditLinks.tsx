import { Control } from "react-hook-form";
import Button from '@mui/material/Button';
import { FormInputText } from "./FormInputText";
import { Box } from "./Box";
import { FormInputSelect } from "./FormInputSelect";
import { dialogStore } from "./state";

export const DialogEditLinks = ({
  next,
  control,
  blacklistedIds = [],
  addNodeNext,
}: {
  next: DialogNode["next"];
  control: Control<DialogNode, any>;
  blacklistedIds?: DialogNode["id"][];
  addNodeNext: () => void;
}) => {
  return (
    <>
      {next.map(({ to, value }, index) => (
        <div key={index}>
          <Box>
            <FormInputSelect
              label="To"
              name={`next.${index}.to`}
              control={control}
              options={dialogStore.options.filter(option => !blacklistedIds.includes(option.value))}
            />
          </Box>
          <Box>
            <FormInputText
              label="Text"
              name={`next.${index}.value`}
              control={control}
            />
          </Box>
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

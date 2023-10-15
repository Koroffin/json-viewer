import { Control } from "react-hook-form";
import { FormInputText } from "./FormInputText";
import { Box } from "./Box";
import { FormInputSelect } from "./FormInputSelect";
import { dialogStore } from "./state";

export const DialogEditLinks = ({
  next,
  control,
  blacklistedIds = [],
}: {
  next: DialogNode["next"];
  control: Control<DialogNode, any>;
  blacklistedIds?: DialogNode["id"][];
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
    </>
  );
};

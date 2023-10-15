import { Controller, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputTextProps } from "./FormInputProps";

export const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  multiline = false,
}: FormInputTextProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          multiline={multiline}
        />
      )}
    />
  );
};

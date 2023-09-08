import { Controller } from "react-hook-form";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";

const $TextField = styled(TextField)`
  width: 100%;
`;

export const FormInputText = ({
  name,
  control,
  label,
  multiline = false,
}: FormInputProps) => {
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

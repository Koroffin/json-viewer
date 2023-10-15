import { Controller, FieldValues } from "react-hook-form";
import { FormInputSelectProps } from "./FormInputProps";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const FormInputSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
}: FormInputSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id={name}
            value={value}
            label="Age"
            onChange={onChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

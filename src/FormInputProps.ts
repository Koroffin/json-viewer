import { type } from "os";
import { Control, FieldValues, Path } from "react-hook-form";

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
};

export type FormInputTextProps<T extends FieldValues> = FormInputProps<T> & {
  multiline?: boolean;
};

export type FormInputSelectProps<T extends FieldValues> = FormInputProps<T> & {
  options: {
    label: string;
    value: string | number;
  }[];
};

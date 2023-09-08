import { Control } from "react-hook-form";

export interface FormInputProps {
  name: keyof Quest;
  control: Control<Quest>;
  label: string;
  multiline?: boolean;
}

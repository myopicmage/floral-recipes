import { Select as ChakraSelect } from "@chakra-ui/react";
import { useField } from "formik";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import type { TextFieldProps } from "./props";

export type DropdownProps = TextFieldProps & {
  children: React.ReactNode;
};

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const [field, meta] = useField(props.name);

  return (
    <FormControl isInvalid={Boolean(meta.touched && meta.error)}>
      <ChakraSelect {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

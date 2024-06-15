import React from "react";
import { MultiSelect } from "react-multi-select-component";
import { FormControl, FormLabel } from "@chakra-ui/react";

const ChakraMultiSelect = ({
  label,
  options,
  selected,
  setSelected,
  isReadOnly,
}) => {
  return (
    <FormControl isReadOnly={isReadOnly}>
      <FormLabel>{label}</FormLabel>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={label}
        isDisabled={isReadOnly}
      />
    </FormControl>
  );
};

export default ChakraMultiSelect;
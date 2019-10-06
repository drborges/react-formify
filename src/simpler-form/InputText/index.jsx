import React from "react";

import useScopedInput from "../useScopedInput";

const InputText = ({
  inputRef,
  name,
  defaultValue,
  filters,
  validators,
  ...props
}) => {
  const { input, error, invalid, validating } = useScopedInput(
    name,
    defaultValue,
    filters,
    validators
  );

  return (
    <>
      <input
        {...props}
        {...input}
        type="text"
        ref={inputRef}
        className={invalid ? "invalid" : "valid"}
      />
      {validating && <span>validating...</span>}
      {invalid && <span>{error}</span>}
    </>
  );
};

export default InputText;

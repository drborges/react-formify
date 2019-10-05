import React from "react";

import useScopedInput from "../useScopedInput";

const InputCheck = ({ inputRef, name, index, defaultValue, ...props }) => {
  const input = useScopedInput(name, index, defaultValue);
  return (
    <input
      {...props}
      {...input}
      type="checkbox"
      ref={inputRef}
      checked={input.value}
    />
  );
};

export default InputCheck;

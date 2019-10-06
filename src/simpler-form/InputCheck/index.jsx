import React from "react";

import useScopedInput from "../useScopedInput";

const InputCheck = ({ inputRef, name, defaultValue, ...props }) => {
  const { input } = useScopedInput(name, defaultValue);
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

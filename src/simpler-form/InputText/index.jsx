import React, { useContext, useState } from "react";

import useScopedInput from "../useScopedInput"

const InputText = ({ inputRef, name, index, defaultValue, ...props }) => {
  const input = useScopedInput(name, index, defaultValue)
  return (
    <input
      {...props}
      {...input}
      type="text"
      ref={inputRef}
    />
  );
};

export default InputText;

import React from "react";

const InputCheckbox = ({
  inputRef,
  valid,
  invalid,
  prestine,
  value,
  ...props
}) => {
  return <input {...props} type="checkbox" ref={inputRef} checked={value} />;
};

export default InputCheckbox;

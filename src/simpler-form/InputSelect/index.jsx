import React from "react";

const InputSelect = ({
  children,
  inputRef,
  valid,
  invalid,
  prestine,
  ...props
}) => {
  return (
    <select {...props} type="number" ref={inputRef}>
      {children}
    </select>
  );
};

export default InputSelect;

import React from "react";

const InputNumber = ({ inputRef, valid, invalid, prestine, ...props }) => {
  return <input {...props} type="number" ref={inputRef} />;
};

export default InputNumber;

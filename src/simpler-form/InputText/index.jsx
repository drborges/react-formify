import React, { useContext, useState } from "react";

import { FormContext } from "../Form";

const InputText = ({ inputRef, name, index, defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue);
  const parentScope = useContext(FormContext);

  if (index !== undefined) {
    if (!parentScope[index]) {
      parentScope[index] = {};
    }
    parentScope[index][name] = value;
  } else {
    if (!parentScope[name]) {
      parentScope[name] = {};
    }
    parentScope[name] = value;
  }

  return (
    <input
      {...props}
      type="text"
      ref={inputRef}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default InputText;

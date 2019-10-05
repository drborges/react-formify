import { useContext, useState } from "react";

import { FormContext } from "./Form";

const useScopedInput = (name, index, defaultValue) => {
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

  return {
    value,
    onChange: e =>
      setValue(e.target.type === "checkbox" ? e.target.checked : e.target.value)
  };
};

export default useScopedInput;

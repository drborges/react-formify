import{ useContext, useState, useEffect } from "react";

import { FormContext } from "./Form";

const useScopedInput = (name, index, defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const parentScope = useContext(FormContext);

  console.log(">>>> defaultValue", defaultValue)

  useEffect(() => {
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
  })

  return {
    value,
    onChange: e => setValue(e.target.value),
  }
}

export default useScopedInput
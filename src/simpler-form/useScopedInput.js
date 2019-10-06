import { useContext, useState } from "react";

import { FormContext } from "./Form";

const useScopedInput = (name, defaultValue, filters = [], validators = []) => {
  const parentScope = useContext(FormContext);
  const [value, setValue] = useState(defaultValue);
  const [prestine, setPrestine] = useState(true);
  const [error, setError] = useState();
  const [validating, setValidating] = useState(false);
  const applyFilters = value =>
    filters.reduce((result, filter) => filter(result), value);

  const applyValidators = (value, validators) => {
    if (validators.length > 0) {
      setValidating(true);
    }

    Promise.all(validators.map(validator => validator(value)))
      .then(() => setError(null))
      .catch(setError)
      .then(() => setValidating(false));
  };

  parentScope[name] = value;

  const input = {
    value,
    onChange: e => {
      const currentValue =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      const newValue = applyFilters(currentValue);
      setValue(newValue);
      setPrestine(false);
      applyValidators(newValue, validators);
    }
  };

  return {
    input,
    error,
    prestine,
    validating,
    valid: !prestine && error === null,
    invalid: !prestine && error !== null
  };
};

export default useScopedInput;

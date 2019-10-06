import { useContext, useState } from "react";

import { FormContext } from "./Form";

const applyFilters = (value, filters) => {
  return filters.reduce((result, filter) => filter(result), value);
};

const applyValidators = (value, validators, setValidating, setError) => {
  if (validators.length > 0) {
    setValidating(true);
  }

  Promise.all(validators.map(validator => validator(value)))
    .then(() => setError(null))
    .catch(setError)
    .then(() => setValidating(false));
};

const useScopedInput = (name, defaultValue, filters = [], validators = []) => {
  const { values, onTouched } = useContext(FormContext);
  const [value, setValue] = useState(defaultValue);
  const [prestine, setPrestine] = useState(true);
  const [error, setError] = useState();
  const [validating, setValidating] = useState(false);

  values[name] = value;

  const input = {
    value,
    onChange: e => {
      const currentValue =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      const newValue = applyFilters(currentValue, filters);
      setValue(newValue);
      setPrestine(false);
      onTouched();
      applyValidators(newValue, validators, setValidating, setError);
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

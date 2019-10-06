import React, { useState, useContext, useEffect } from "react";

export const FormContext = React.createContext({});

export const useForm = () => {
  const data = useContext(FormContext);
  return {
    data
  };
};

const Scope = ({ children, name, list }) => {
  const parentScope = useContext(FormContext);

  if (!parentScope[name]) {
    parentScope[name] = list ? [] : {};
  }

  return (
    <FormContext.Provider value={parentScope[name]}>
      {children}
    </FormContext.Provider>
  );
};

/**
 * - The form must provide hooks to update the validation state: onValid({ name, value, setValue, path }) & onInvalid({ name, value, setValue, path })
 * - Provide onChange listener to specific fields: onChange({ name, value, setValue, path })
 */
const Form = ({ children, onSubmit, ...props }) => {
  const [prestine, setPrestine] = useState(true);
  const [fieldsCount, setFieldsCount] = useState(0);
  const [invalidFieldsCount, setInvalidFieldsCount] = useState(0);
  const [validity, setValidity] = useState();

  const data = {};
  const form = {
    prestine,
    fieldsCount,
    invalidFieldsCount,
    validity,
    registerField: (name, value) => {
      setFieldsCount(count => count + 1);
    },
    onChange: ({ valid }) => {
      setPrestine(false);
      if (!valid) {
        setInvalidFieldsCount(count => count + 1);
      }
    }
  };

  useEffect(() => {
    if (invalidFieldsCount === 0) setValidity("valid");
    else setValidity("invalid");
  }, [invalidFieldsCount]);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(data);
  };

  return (
    <FormContext.Provider value={data}>
      <form {...props} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Scope = Scope;

export default Form;

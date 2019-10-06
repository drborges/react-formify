import React, { useState, useContext } from "react";

export const FormContext = React.createContext({});

export const useForm = () => {
  return useContext(FormContext);
};

const Scope = ({ children, name, list }) => {
  const [prestine, setPrestine] = useState(true);
  const { values, onTouched } = useContext(FormContext);
  if (!values[name]) {
    values[name] = list ? [] : {};
  }

  const scope = {
    prestine,
    values: values[name],
    onTouch: () => {
      setPrestine(false);
      onTouched();
    }
  };

  return <FormContext.Provider value={scope}>{children}</FormContext.Provider>;
};

/**
 * - The form must provide hooks to update the validation state: onValid({ name, value, setValue, path }) & onInvalid({ name, value, setValue, path })
 * - Provide onChange listener to specific fields: onChange({ name, value, setValue, path })
 */
const Form = ({ children, onSubmit, ...props }) => {
  const [prestine, setPrestine] = useState(true);

  const values = {};
  const scope = {
    prestine,
    values,
    onTouched: () => setPrestine(false)
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <FormContext.Provider value={scope}>
      <form {...props} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Scope = Scope;

export default Form;

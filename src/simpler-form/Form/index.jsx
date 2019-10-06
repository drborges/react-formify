import React, { useState, useContext, } from "react";

export const FormContext = React.createContext({
  name: "root",
  values: {},
  onTouch: () => {},
});

export const useScope = () => {
  return useContext(FormContext);
};

const useScopeCreator = (name, initialValue) => {
  const [value] = useState(initialValue)
  const [prestine, setPrestine] = useState(true);
  const parentScope = useScope();
  console.debug(`Creating scope ${name}`);

  if (!parentScope.values[name]) {
    console.debug(`Registering scope ${name} with parent ${parentScope.name}`);
    parentScope.values[name] = value;
  }

  return {
    name,
    prestine,
    values: value,
    parentScope: parentScope,
    isArray: Array.isArray(value),
    onTouch: () => {
      setPrestine(false);
      parentScope.onTouch();
    }
  };
};

const Scope = ({ children, name, list = false }) => {
  const scope = useScopeCreator(name, list ? [] : {})
  return <FormContext.Provider value={scope}>{children}</FormContext.Provider>;
};

/**
 * - The form must provide hooks to update the validation state: onValid({ name, value, setValue, path }) & onInvalid({ name, value, setValue, path })
 * - Provide onChange listener to specific fields: onChange({ name, value, setValue, path })
 */
const Form = ({ children, name, onSubmit, ...props }) => {
  const scope = useScopeCreator(name, {})

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(scope.values);
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

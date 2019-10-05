import React, { useContext } from "react";

export const FormContext = React.createContext({});

const Scope = ({ children, name, list }) => {
  const scope = list ? [] : {};
  const parentScope = useContext(FormContext);
  if (!parentScope[name]) {
    parentScope[name] = scope;
  }

  return <FormContext.Provider value={scope}>{children}</FormContext.Provider>;
};

const Form = ({ children, onSubmit, ...props }) => {
  const formData = {};
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContext.Provider value={formData}>
      <form {...props} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Scope = Scope;

export default Form;

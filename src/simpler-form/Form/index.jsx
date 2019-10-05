import React, { useContext, useEffect } from "react";

export const FormContext = React.createContext({});

export const useForm = () => {
  const data = useContext(FormContext)
  return {
    data
  }
}

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

const Form = ({ children, onSubmit, ...props }) => {
  const data = {};
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

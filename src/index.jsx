import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import {
  Button,
  Form,
  useScope,
  InputText,
  InputCheck,
  validators
} from "./simpler-form";

const useSwappable = initialList => {
  const [list, setList] = useState(initialList);

  return [
    list,
    (i, j) => {
      const newList = [...list];
      const item = newList[i];
      newList[i] = newList[j];
      newList[j] = item;
      setList(newList);
    }
  ];
};

const onlyLetters = value => value.replace(/\d/, "");

const FormFields = ({ name, email, active, address, todos, onSwap }) => {
  const { values, prestine } = useScope();
  const handleNext = () => {
    console.log(">>>> NEXT: ", values.address.city);
  };

  return (
    <>
      {prestine && <div>Form is prestine!</div>}
      {!prestine && <div>Form is no longer prestine!</div>}
      <div>
        <label>Name: </label>
        <InputText
          name="name"
          defaultValue={name}
          filters={[onlyLetters]}
          validators={[validators.required()]}
        />
      </div>

      <div>
        <label>Email: </label>
        <InputText name="email" defaultValue={email} />
      </div>

      <div>
        <label>Active: </label>
        <InputCheck name="active" defaultValue={active} />
      </div>

      <div>
        <label>Todos:</label>
        <Form.Scope name="todos" list>
          {todos.map((todo, i) => (
            <div key={todo.id}>
              <Form.Scope name={i}>
                <InputText name="text" defaultValue={todo.text} />
                <InputText name="state" defaultValue={todo.state} />
              </Form.Scope>
            </div>
          ))}
        </Form.Scope>
      </div>

      <div>
        <label>Address:</label>
        <Form.Scope name="address">
          <InputText name="street" defaultValue={address.street} />
          <InputText name="city" defaultValue={address.city} />
        </Form.Scope>
      </div>

      <Button type="button" onClick={onSwap}>
        Swap!
      </Button>
      <Button type="button" onClick={handleNext}>
        Next >
      </Button>
    </>
  );
};

const form = {
  name: "Diego",
  email: "drborges.cic@gmail.com",
  active: true,
  address: {
    street: "Walnut St.",
    city: "Philly"
  },
  todos: [
    { id: 1, text: "Walk the dog", state: "doing" },
    { id: 2, text: "Do the dishes", state: "done" },
    { id: 3, text: "Clean the house", state: "todo" }
  ]
};

function App() {
  const [submitting, setSubmitting] = useState(false);
  const [todos, swap] = useSwappable(form.todos);

  const handleSwap = () => {
    swap(0, 1);
  };

  const handleSubmit = data => {
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 2000);
    console.log("Submit", data);
  };

  return (
    <div className="App">
      <Form name="my_form" onSubmit={handleSubmit} disabled={submitting}>
        <FormFields {...form} todos={todos} onSwap={handleSwap} />
        <Button type="submit" disabled={submitting}>
          Save
        </Button>
        {submitting && <span>Submitting...</span>}
      </Form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

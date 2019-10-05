import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Button, Form, InputText, InputCheck } from "./simpler-form";

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

const FormFields = ({ name, email, active, address, todos, onSwap }) => {
  return (
    <>
      <div>
        <label>Name: </label>
        <InputText name="name" defaultValue={name} />
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
              <InputText index={i} name="text" defaultValue={todo.text} />
              <InputText index={i} name="state" defaultValue={todo.state} />
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

      <Button onClick={onSwap}>Swap!</Button>
    </>
  );
};

function App() {
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

  const [todos, swap] = useSwappable(form.todos);

  const handleSwap = () => {
    swap(0, 1);
  };

  const handleSubmit = data => {
    console.log("Submit", data);
  };

  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <FormFields {...form} todos={todos} onSwap={handleSwap} />
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Button, Form, InputText } from "./simpler-form";

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

const FormFields = ({ todos, onSwap }) => {
  const [error, setError] = useState();

  console.log(">>>> rendering");
  return (
    <>
      {error && <div>{error}</div>}
      <div>
        <label>Name: </label>
        <InputText name="name" defaultValue="Diego" />
      </div>

      <div>
        <label>Email: </label>
        <InputText name="email" defaultValue="drborges.cic@gmail.com" />
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
          <InputText name="street" defaultValue="Mario Antunes da Cunha" />
          <InputText name="city" defaultValue="Porto Alegre" />
        </Form.Scope>
      </div>

      <Button onClick={onSwap}>Swap!</Button>
    </>
  );
};

function App() {
  const data = [
    { id: 1, text: "Walk the dog", state: "done" },
    { id: 2, text: "Do the dishes", state: "todo" },
    { id: 3, text: "Clean the house", state: "doing" }
  ];

  const [todos, swap] = useSwappable(data);

  const handleSwap = () => {
    swap(0, 1);
  };

  const handleSubmit = data => {
    console.log("Submit", data);
  };

  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <FormFields todos={todos} onSwap={handleSwap} />
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

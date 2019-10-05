import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";

import { Button, Form, FormContext, InputText } from "./simpler-form";

const FormFields = ({ todos }) => {
  const [error, setError] = useState()
  const formData = useContext(FormContext)

  console.log(">>>> before mounting")

  useEffect(() => {
    if (formData.name === "Diego") {
      setError("Name cannot be 'Diego'")
      console.log(">>>> after mounting")
    }
  }, formData)

  return (
    <>
      {error && (
        <div>{error}</div>
      )}
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
            <div>
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
    </>
  )
}

function App() {
  const todos = [
    { id: 1, text: "Walk the dog", state: "done" },
    { id: 2, text: "Do the dishes", state: "todo" },
    { id: 3, text: "Clean the house", state: "doing" }
  ];

  const handleSubmit = data => {
    console.log(">>>>>", data);
  };

  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <FormFields todos={todos} />
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
}

/**
 * {
 *  name: "asdasd",
 *  email: "asdasd",
 *  todos: [
 *    { text: "asdasd", state: "asdasd"}
 * ]
 * }
 */

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

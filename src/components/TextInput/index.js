import React from "react";
import "./input.css";

const Input = () => {
  return (
    <input
      type="text"
      id="inputTodo"
      className="text-input"
      // placeholder="Insira uma tarefa aqui!"
      maxLength="50"
    />
  );
};

export default Input;

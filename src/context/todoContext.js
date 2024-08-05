import { createContext, useContext } from "react";

const ToDoContext = createContext({
  todos: [{ id: 1, todo: "hello brother", completed: false }],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  completeTodo: (id) => {},
});

const ToDoProvider = ToDoContext.Provider;

const useToDo = () => useContext(ToDoContext);

export { ToDoContext, ToDoProvider, useToDo };

import React, { useState } from "react";
import { useToDo } from "../context/todoContext";

const InputList = ({ todoo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todoo?.todoInput);
  const { updateTodo, deleteTodo, completeTodo } = useToDo();

  const editTodo = () => {
    updateTodo(todoo.id, { ...todoo, todo: todoMsg });
    setIsTodoEditable(false);
  };
  const todoCompleted = () => {
    completeTodo(todoo.id);
  };

  return (
    <div
      className={`w-full flex items-center gap-4 justify-center p-3 rounded-lg ${
        todoo.completed ? "bg-green-200" : "bg-white/70"
      }`}
    >
      <div className="flex items-center">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={todoo.completed}
          className="w-5 h-5 text-blue-600 bg-gray-100 rounded  dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={todoCompleted}
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        ></label>
      </div>
      <input
        className={`w-[80%] py-1 bg-transparent text-xl border-none outline-none ${
          todoo.completed ? "line-through" : ""
        }`}
        type="text"
        value={todoo.todo?todoo.todo:todoMsg}
        onChange={(e) => {
          setTodoMsg(e.target.value);
        }}
        readOnly={!isTodoEditable}
      />
      <div className="flex items-center gap-3 text-black">
        <span
          className="text-slate-800 cursor-pointer leading-3 text-2xl font-semibold"
          onClick={() => {
            if (todoo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else {
              setIsTodoEditable((prev)=>!prev);
            }
          }}
        >
          {isTodoEditable ? (
            <ion-icon name="save-outline"></ion-icon>
          ) : (
            <ion-icon name="create-outline"></ion-icon>
          )}
        </span>
        <span
          className="cursor-pointer leading-3 text-2xl font-semibold text-red-500"
          onClick={() => deleteTodo(todoo.id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </span>
      </div>
    </div>
  );
};

export default InputList;

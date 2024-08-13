import React, { useEffect, useState } from "react";
import InputBox from "./components/InputBox";
import InputList from "./components/InputList";
import { ToDoProvider } from "./context/todoContext";


const App = () => {
  const [todos, setTodos] = useState([]);
  const [dateTime, setDateTime] = useState(null);

  const addTodo = (todo) => {
    setTodos((prevTodo) => {
      return [{ id: Date.now(), ...todo }, ...prevTodo];
    });
  };
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => {
        return prevTodo.id === id ? todo : prevTodo;
      })
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => {
        return todo.id !== id;
      })
    );
  };
  const completeTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
 
  


  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

   useEffect(() => {
    const clear = setInterval(() => {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      const date = today.toLocaleDateString();
      const time = today.toLocaleTimeString();
      setDateTime(`${date} - ${time}`);
    }, 1000);

    return () => clearInterval(clear);
  }, []);
   
  // console.log(todos);
  return (
    <ToDoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, completeTodo }}
    >
      <div className="w-full bg-slate-800 min-h-screen p-5">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-5">
          <h1 className="text-white font-semibold text-2xl md:text-3xl pt-10">
            Manage Your Todos
          </h1>
          <p className="text-2xl text-white">{dateTime}</p>
          <div className="w-full flex items-center">
            <InputBox />
          </div>
          <div className="w-full flex flex-col gap-4 items-center">
            {
              todos?.map((todo)=>(
                <InputList key={todo.id} todoo={todo}/>
              ))
            }
            
          </div>
          <div className="mt-5">
          <button
            className="px-5 py-3 outline-none text-white bg-red-500 cursor-pointer rounded-lg font-semibold"
            onClick={() => setTodos([])}
          >
            CLEAR ALL
          </button>
        </div>
        </div>
      </div>
    </ToDoProvider>
  );
};

export default App;

import { useEffect, useState } from "react";

import "./App.css";
import { TodoProvider } from "./context";
import { DarkProvider } from "./context";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import ModeSwitcher from "./components/ThemeBtn";

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  useEffect(() => {
    const htmlclass = document.querySelector("html").classList;
    htmlclass.remove("light", "dark");
    htmlclass.add(themeMode);
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // const [themeMode, setThemeMode] = useState("light");

  
  // useEffect(() => {
  //   const htmlclass = document.querySelector("html").classList;
  //   htmlclass.remove("light", "dark");
  //   htmlclass.add(themeMode);
  // }, [themeMode]);
  
  // const lightTheme = () =>{
  //   setThemeMode("light");
  // };

  // const darkTheme = () =>{
  //   setThemeMode("dark");
  // };

  const [todos, setTodos] = useState([
    ///////////////////////////////////////////////////////////////////
    // {
    //   _id: 1,
    //   todo: " Welcome! ",
    //   checked: false,
    // },
    // {
    //   _id: 2,
    //   todo: " <-- Click to mark as done! ",
    //   checked: false,
    // },
    // {
    //   _id: 3,
    //   todo: " Click ✏️/📁 to edit/save -> ",
    //   checked: false,
    // },

    // causing issue with rendering list
     ///////////////////////////////////////////////////////////////////
  ]);

  const addTodo = (todo) => {
    setTodos((prevTodo) => [{ _id: Date.now(), ...todo }, ...prevTodo]);
  };

  const updateTodo = (_id, todo) => {
    setTodos((prevTodo) =>
      prevTodo.map((prev) => (prev._id === _id ? todo : prev))
    );
  };

  const deleteTodo = (_id) => {
    setTodos((prevTodo) => prevTodo.filter((prev) => prev._id !== _id));
  };

  const isToggled = (_id) => {
    setTodos((prevTodo) =>
      prevTodo.map((prev) =>
        prev._id === _id ? { ...prev, checked: !prev.checked } : prev
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <DarkProvider value={{ themeMode, setThemeMode }}>
      <TodoProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, isToggled }}
      >
        <div className="bg-white dark:bg-[#172842] min-h-screen py-8">
          <div className="absolute top-5 right-5">
            <ModeSwitcher/>
          </div>
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 bg-[#e7f5f5] dark:bg-[#122440] dark:text-white text-[#172842]">
            <h1 className=" text-2xl font-bold text-center mb-8 mt-2">
              Todos{" "}
            </h1>
            <div className="mb-4">
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => (
                <div className="w-full" key={todo._id}>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </DarkProvider>
  );
}

export default App;

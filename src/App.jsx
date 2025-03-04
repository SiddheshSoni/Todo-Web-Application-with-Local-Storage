import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./context";
import { DarkProvider } from "./context";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import ModeSwitcher from "./components/ThemeBtn";
import Date from "./utilities/Date";

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

  /////////////////////////// Added some Filler text/instructions ///////////////////////////
  const initialTodos = () => {
    const existingTodos = JSON.parse(localStorage.getItem("todos"));  // Stored data in local storage. "todos" is the key!!!

    if (existingTodos && existingTodos.length > 0) {
       return existingTodos;
    }
    else{
        return[
          {
            _id: 1,
            todo: " Welcome! ",
            checked: false,
          },
          {
            _id: 2,
            todo: " <-- Click to mark as done! ",
            checked: false,
          },
          {
            _id: 3,
            todo: " Click ✏️/📁 to edit/save -> ",
            checked: false,
          },
        ];
      }
    }

  // Assigning initialTodos() to useState so it loads the component once and store it.
  const [todos, setTodos] = useState(initialTodos);

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

  // const date = Date;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <DarkProvider value={{ themeMode, setThemeMode }}>
      <TodoProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, isToggled }}
      >
        <div className=" bg-white dark:bg-[#172842] min-h-screen py-8">
            <div className=" p-2 dark:bg-[#e7f5f5] bg-[#122440] text-white dark:text-[#172842] rounded w-fit absolute top-5 left-5">  
              
            <h1 className="text-2xl font-bold ">{Date}</h1>
            </div>
          <div className="absolute top-5 right-5">
            <ModeSwitcher/>
          </div>
          <div className="
          w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 bg-[#e7f5f5] dark:bg-[#122440] dark:text-white text-[#172842]">
            <h1 className=" text-2xl font-bold text-center mb-8 mt-2">
              Todos 
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

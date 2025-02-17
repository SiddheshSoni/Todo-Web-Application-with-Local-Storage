import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            _id: 1,
            todo: " Todo text",
            checked: false
        }
    ],
    addTodo: (todo)=>{},
    updateTodo: (_id, todo)=>{},
    deleteTodo: (_id)=>{},
    isToggled: (_id)=>{}
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () =>{
    return useContext(TodoContext)
};
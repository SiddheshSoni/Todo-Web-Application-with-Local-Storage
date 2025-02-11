import React, { useState } from "react";
import { useTodo } from "../context";

export function TodoItem({ todo }) {
    const [isEditable, setisEditable] = useState(false);
    const [todotxt, setTodotxt] = useState(todo.todo);
    const {updateTodo, deleteTodo, isToggled} = useTodo();

    const edit = () => { 
        updateTodo(todo._id, {...todo, todo: todotxt})
        setisEditable((prev) => !prev)
    };

    const dlt = () => {
        deleteTodo(todo._id)
    };

    const toggle = () => {
        isToggled(todo._id)
    }


    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.checked}
                onChange={toggle}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.checked ? "line-through" : ""}`}
                value={todotxt}
                onChange={(e) => setTodotxt(e.target.value)}
                readOnly={!isEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.checked) return;

                    if (isEditable) {
                        edit();
                    } else setisEditable((prev) => !prev);
                }}
                disabled={todo.checked}
            >
                {isEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => dlt(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}



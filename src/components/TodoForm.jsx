import { useState } from "react";
import { useTodo } from "../context";

export function TodoForm() {
    const [todo, setTodo] = useState("");
    const{ addTodo} = useTodo();

    const addtodo = (e) =>{
        e.preventDefault(); //parenthesis added! :P
        
        if(!todo) return

        addTodo({todo: todo});
        setTodo("");
    };

    return (
        <form onSubmit={addtodo} className="flex">
            <input
                type="text"
                value={todo}
                onChange={(e)=> setTodo(e.target.value)}
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-[#172842]/10 dark:bg-white/20 py-1.5"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-700 dark:bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}


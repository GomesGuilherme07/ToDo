import React, { createContext, useEffect, useState } from "react";
import { Todo } from "../models/Todo";
import { getTodo, saveTodo } from "../services/TodoServices";
import { TodoContextType } from "./TodoContextType";

export const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: () => { },
    removeTodo: () => { },
    toggle: () => { }
});

const TodoProvider = (props: any) => {

    const [todos, setTodos] = useState<Todo[]>(getTodo);

    //useEffect observa alterações em um objeto e executa alguma ação após alteração do objeto
    useEffect(() => {
        saveTodo(todos);
    }, [todos]);

    const addTodo = (title: string) => {
        const newTodo: Todo = { id: todos.length + 1, title: title, done: false };
        setTodos([...todos, newTodo]); // Pega a lista de tarefas (todos) e adiciona um novo item
    }

    const removeTodo = (todo: Todo) => {
        const index = todos.indexOf(todo);
        setTodos(todos.filter((_, i) => i !== index));
    }

    const toggle = (todo: Todo) => {
        const index = todos.indexOf(todo);
        todos[index].done = !todo.done;
        setTodos([...todos]);
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggle }}>
            {props.children}

        </TodoContext.Provider>
    );
}

export default TodoProvider;
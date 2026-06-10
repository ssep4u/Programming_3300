import { useState, useEffect } from 'react';
import './todolist.css';
import TodoHeader from './components/TodoHeader.jsx';
import TodoAdder from './components/TodoAdder.jsx';
import TodoList from './components/TodoList.jsx';
import AudioBox from './AudioBox.jsx';   // ← AudioBox 임포트

class Todo {
    constructor(text) {
        this.id = Date.now();
        this.text = text;
        this.isCompleted = false;
    }
}

const TODOS_STORAGE_KEY = 'todos';

function TodoListApp() {
    const initTodos = () => {
        const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
        return savedTodos ? JSON.parse(savedTodos) : [];
    };

    const [todos, setTodos] = useState(initTodos);

    useEffect(() => {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => setTodos((todos) => [
        ...todos,
        new Todo(text)
    ]);

    const toggleTodo = (id) => {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos((todos) =>
            todos.filter((todo) => todo.id !== id)
        );
    };

    const editTodo = (id, newText) => {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    return (
        <div className="todo">
            <AudioBox />          {/* ← TodoList 상단에 AudioBox 추가 */}
            <TodoHeader />
            <TodoAdder addTodo={addTodo} />
            <TodoList
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
            />
        </div>
    );
}

export default TodoListApp;
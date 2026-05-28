import { useState, useEffect } from 'react';
import './todolist.css'
// import TodoItemEmpty from './components/TodoItemEmpty.jsx'
// import Button from './components/Button.jsx'
// import Checkbox from './components/Checkbox.jsx'
import TodoHeader from './components/TodoHeader.jsx'
import TodoAdder from './components/TodoAdder.jsx'
// import TodoItem from './components/TodoItem.jsx'
import TodoList from './components/TodoList.jsx'

class Todo {
    constructor(text) {
        this.id = Date.now();   //할일 id: 고유의 값 == new Date().getTime()
        this.text = text;       //할일의 내용
        this.isCompleted = false; //할일 완료 여부
    }
}

const TODOS_STORAGE_KEY = 'todos';

function TodoListApp() {

    const today = new Date().toLocaleDateString()

    //LocalStorage에 저장된 할 일 목록 불러오자
    //LocalStorage에 저장된게 있으면, todos 대입, 없으면 []
    const initTodos = () => {
        const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
        return savedTodos ? JSON.parse(savedTodos) : []; //string -> JSON
    }

    const [todos, setTodos] = useState(initTodos);

    //LocalStorage에 할 일 목록 저장하자
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
                todo.id === id
                    ? { ...todo, isCompleted: !todo.isCompleted }
                    : todo
            )
        )
    }

    const deleteTodo = (id) => {
        setTodos((todos) =>
            todos.filter((todo) => todo.id !== id)
        )
    }

    const editTodo = (id, newText) => {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, text: newText }
                    : todo
            )
        )
    }

    return (
        <div className="todo">

            <h2 className="date">
                오늘 날짜 : {today}
            </h2>

            <TodoHeader />

            <TodoAdder addTodo={addTodo} />

            <TodoList
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
            />
        </div>
    )
}

export default TodoListApp;
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
        this.id = Date.now(); // 할 일 id
        this.text = text; // 할 일 내용
        this.isCompleted = false; // 완료 여부
    }
}

const TODOS_STORAGE_KEY = 'todos';

function TodoListApp() {

    // 오늘 날짜
    const today = new Date().toLocaleDateString()

    // LocalStorage에 저장된 할 일 목록 불러오기
    const initTodos = () => {
        const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);

        return savedTodos
            ? JSON.parse(savedTodos)
            : [];
    }

    // todos 상태
    const [todos, setTodos] = useState(initTodos);

    // LocalStorage에 저장
    useEffect(() => {
        localStorage.setItem(
            TODOS_STORAGE_KEY,
            JSON.stringify(todos)
        );
    }, [todos]);

    // 할 일 추가
    const addTodo = (text) => setTodos((todos) => [
        ...todos,
        new Todo(text)
    ]);

    // 완료 체크
    const toggleTodo = (id) => {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        isCompleted: !todo.isCompleted
                    }
                    : todo
            )
        )
    }

    // 삭제
    const deleteTodo = (id) => {
        setTodos((todos) =>
            todos.filter((todo) => todo.id !== id)
        )
    }

    // 수정
    const editTodo = (id, newText) => {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        text: newText
                    }
                    : todo
            )
        )
    }

    return (
        <div className="todo">

            <div className="date">
                오늘 날짜 : {today}
            </div>

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
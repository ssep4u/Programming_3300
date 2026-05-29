import { useState, useEffect } from 'react';
import './todolist.css'

import TodoHeader from './components/TodoHeader.jsx'
import TodoAdder from './components/TodoAdder.jsx'
import TodoList from './components/TodoList.jsx'

class Todo {
    constructor(text) {
        this.id = Date.now(); // 할 일 id
        this.text = text; // 할 일 내용
        this.isCompleted = false; // 완료 여부
        this.createdAt = `추가한 날짜 : ${new Date().toLocaleDateString()}`;
    }
}

const TODOS_STORAGE_KEY = 'todos';

function TodoListApp() {

    // LocalStorage 불러오기
    const initTodos = () => {
        const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);

        return savedTodos
            ? JSON.parse(savedTodos)
            : [];
    }

    // 상태
    const [todos, setTodos] = useState(initTodos);

    // LocalStorage 저장
    useEffect(() => {
        localStorage.setItem(
            TODOS_STORAGE_KEY,
            JSON.stringify(todos)
        );
    }, [todos]);

    // 추가
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
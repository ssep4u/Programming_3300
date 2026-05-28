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
        this.completedAt = null; // 완료된 시각 (ms 기준으로), 미완료면 null
    }
}
const TODOS_STORAGE_KEY = 'todos';
function TodoListApp() {
    //LocalStorage에 저장된 할 일 목록 불러오자
    //LocalStorage에 저장된게 있으면, todos 대입, 없으면 []
    const initTodos = () => {
        const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
        return savedTodos ? JSON.parse(savedTodos) : [];                 //string -> JSON
    }

    const [todos, setTodos] = useState(initTodos);  //initTodos 함수는 react 처음 한번 호출
    // 완료한 지 하루가 지난 항목 자동 삭제
    useEffect(() => {
        const oneDayMs = 24 * 60 * 60 * 1000;
        const now = Date.now();
        setTodos((prev) =>
            prev.filter((todo) =>
                !(todo.isCompleted && todo.completedAt && now - todo.completedAt >= oneDayMs)
            )
        );
    }, []);

    //LocalStorage에 할 일 목록 저장하자
    useEffect(() => {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos)); //JSON -> string
    }, [todos]);

    const addTodo = (text) => setTodos((todos) => [
        //이전 todos 복사
        ...todos,
        //newTodo 만들어서
        //뒤에 추가하자
        new Todo(text)
    ]);
    const toggleTodo = (id) => {
        setTodos((todos) =>
            todos.map((todo) => {
                if (todo.id !== id) return todo;
                const nowCompleted = !todo.isCompleted;
                return {
                    ...todo,
                    isCompleted: nowCompleted,
                    completedAt: nowCompleted ? Date.now() : null,
                };
            })
        );
    }
    const deleteTodo = (id) => {
        //todos에서 하나씩 꺼낸 todo. id가 다르면, 복사하자
        setTodos((todos) => 
            todos.filter((todo) => todo.id !== id)
        )
    }
    const editTodo = (id, newText) => {
        //todos 하나씩 꺼내어 todo. id가 같으면, 복사하고, text 속성값 newText로 수정하자
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? {...todo, text: newText} : todo
            )
        )
    }

    return (
        <div className="todo">
            <TodoHeader />
            <TodoAdder addTodo={addTodo} />
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
        </div>
    )
}

export default TodoListApp;
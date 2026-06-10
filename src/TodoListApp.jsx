import { useState, useEffect } from 'react';
import './todolist.css'
// import TodoItemEmpty from './components/TodoItemEmpty.jsx'
// import Button from './components/Button.jsx'
// import Checkbox from './components/Checkbox.jsx'
import TodoHeader from './components/TodoHeader.jsx'
import TodoAdder from './components/TodoAdder.jsx'
// import TodoItem from './components/TodoItem.jsx'
import TodoList from './components/TodoList.jsx'
import { Todo } from './types/Todo.jsx'
import { getMinDateTime } from './function/localTime.jsx';

const TODOS_STORAGE_KEY = 'todos';
function TodoListApp() {
    //LocalStorage에 저장된 할 일 목록 불러오자
    //LocalStorage에 저장된게 있으면, todos 대입, 없으면 []
    const initTodos = () => {
        const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
        return savedTodos ? JSON.parse(savedTodos) : [];                 //string -> JSON
    }

    const [todos, setTodos] = useState(initTodos);  //initTodos 함수는 react 처음 한번 호출
    //LocalStorage에 할 일 목록 저장하자
    useEffect(() => {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos)); //JSON -> string
    }, [todos]);

    const addTodo = (text, deadline) => setTodos((todos) => [
        //이전 todos 복사
        ...todos,
        //newTodo 만들어서
        //뒤에 추가하자
        new Todo(text, deadline)
    ]);
    const toggleTodo = (id) => {
        setTodos((todos) =>
            //todos에서 하나씩 꺼내어 todo. todo의 id 와 id가 같다면, 기존 todo.isCompleted 값 수정. 아니면 그대로
            todos.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        )
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
                todo.id === id ? { ...todo, text: newText } : todo
            )
        )
    }

    function showNotification(todo) {
        if (!("Notification" in window)) {
            alert("이 브라우저는 웹 알림을 지원하지 않습니다.");
            return;
        }
        if (Notification.permission === "granted") {
            triggerAlarm(todo);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    triggerAlarm(todo);
                }
            });
        }
    }

    function triggerAlarm(todo) {
        const options = {
            body: todo.text,
            silent: false,
        };
        const notification = new Notification("마감됨", options);
        notification.onclick = () => {
            window.parent.focus();
            notification.close();
        };
    }

    const [count, setCount] = useState(0);

    useEffect(() => {
        let intervalId = null;
        let timeoutId = null;

        const checkDeadlines = () => {
            setCount((prev) => prev + 1);

            const nowTime = getMinDateTime();
            console.log(`[0초 감지] 현재시간: ${nowTime}`);

            todos.forEach(todo => {
                if (todo.deadline === nowTime) {
                    showNotification(todo);
                }
            });
        };

        const startScheduler = () => {
            const now = new Date();

            const nextMinute = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                now.getHours(),
                now.getMinutes() + 1,
                0,
                0
            );

            const timeToNextMinute = nextMinute - now;

            timeoutId = setTimeout(() => {
                checkDeadlines();

                intervalId = setInterval(checkDeadlines, 60000);
            }, timeToNextMinute);
        };

        // 스케줄러 시작
        startScheduler();


        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [todos]);


    return (
        <div className="todo">
            <TodoHeader />
            <TodoAdder addTodo={addTodo} />
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
        </div>
    )
}

export default TodoListApp;
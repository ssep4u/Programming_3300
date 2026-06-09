import { useState, useEffect } from 'react';
import './todolist.css'
// import TodoItemEmpty from './components/TodoItemEmpty.jsx'
// import Button from './components/Button.jsx'
// import Checkbox from './components/Checkbox.jsx'
import TodoHeader from './components/TodoHeader.jsx'
import TodoAdder from './components/TodoAdder.jsx'
// import TodoItem from './components/TodoItem.jsx'
import TodoList from './components/TodoList.jsx'
import TodoSearch from './components/Search.jsx';

const BG_COLORS = ['white', 'yellow', 'green', 'blue', 'pink']

class Todo {
    constructor(text) {
        this.id = crypto.randomUUID();   //할일 id: 고유의 값
        this.text = text;       //할일의 내용
        this.isCompleted = false; //할일 완료 여부
        this.createdAt = Date.now(); //할일 생성 시간
        this.isPined = false;    //할일 고정 여부
    }
}
const TODOS_STORAGE_KEY = 'todos';
function TodoListApp() {
    //LocalStorage에 저장된 할 일 목록 불러오자
    //LocalStorage에 저장된게 있으면, todos 대입, 없으면 []
    const initTodos = () => {
        const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
        const existingTodos = savedTodos ? JSON.parse(savedTodos) : [];                 //string -> JSON

        const urlTodos = new URLSearchParams(window.location.search).getAll('todo');
        if (urlTodos.length > 0) {
            const sharedTodos = urlTodos.map((text) =>
                new Todo(text)
            );

            return [...existingTodos, ...sharedTodos];
        }

        return existingTodos;
    }

    //검색state
    const [searchTerm, setSearchTerm] = useState("");

    const [todos, setTodos] = useState(initTodos);  //initTodos 함수는 react 처음 한번 호출
    useEffect(() => {
        const url = new URL(window.location.href);
        if (!url.searchParams.has('todo')) return;

        url.searchParams.delete('todo');
        window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }, []);
    
    const [bgColor, setBgColor] = useState('white');
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
            //todos에서 하나씩 꺼내어 todo. todo의 id 와 id가 같다면, 기존 todo.isCompleted 값 수정. 아니면 그대로
            todos.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted} : todo
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
                todo.id === id ? {...todo, text: newText} : todo
            )
        )
    }
    const copyShareLink = async () => {
        const url = new URL(window.location.href);
        url.search = '';

        todos.forEach((todo) => {
            url.searchParams.append('todo', todo.text);
        });

        await navigator.clipboard.writeText(url.toString());
    }

    const togglePinTodo = (id) => {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? { ...todo, isPined: !todo.isPined} : todo
            )
        )
    }

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const filteredTodos = normalizedSearchTerm
        ? todos.filter((todo) => todo.text.toLowerCase().includes(normalizedSearchTerm))
        : todos;

    return (
        <div className={`todo todo--${bgColor}`}>
            <TodoHeader copyShareLink={copyShareLink} />
            <div className="todo__colors">
                {BG_COLORS.map((color) => (
                    <button
                        key={color}
                        className={`todo__color-btn todo__color-btn--${color}${bgColor === color ? ' todo__color-btn--active' : ''}`}
                        onClick={() => setBgColor(color)}
                    />
                ))}
            </div>
            <TodoAdder addTodo={addTodo} />
            <TodoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} togglePinTodo={togglePinTodo} />
        </div>
    )
}

export default TodoListApp;

import { useState } from 'react'
import Button from './Button.jsx'
import { getMinDateTime } from '../function/localTime.jsx';

export default function TodoAdder({ addTodo }) {
    const [inputTodo, setInputTodo] = useState('');
    const [deadline, setDeadline] = useState('');
    //submit이면 handleSubmit 실행하자
    //handleSubmit
    //text 받아서 addTodo(text)
    const handleSubmit = (event) => {
        event.preventDefault();     //submit 기본 동작 막자
        if (!inputTodo || !deadline) return; //빈칸 이면 그대로 return

        addTodo(inputTodo.trim(), deadline);     //todos에 todo 추가하자
        setInputTodo('');
        setDeadline('');       //input text 빈칸으로 하자
    }
    
    return (
        <form className="todo__form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="할 일을 입력하세요."
                className="todo__input"
                value={inputTodo}
                onChange={(event) => setInputTodo(event.target.value)}
            />
            <input
                type="datetime-local"
                id="meeting-time"
                className="todo__input"
                min={getMinDateTime()}
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
            />
            <Button type="submit" className="todo__button todo__button--add">Add</Button>
        </form>
    )
}
import { useState } from 'react'
import Button from './Button.jsx'

export default function TodoAdder({ addTodo }) {
    const [inputTodo, setInputTodo] = useState('');
    //submit이면 handleSubmit 실행하자
    //handleSubmit
    //text 받아서 addTodo(text)
    const handleSubmit = (event) => {
        event.preventDefault();     //submit 기본 동작 막자
        if (!inputTodo) return; //빈칸 이면 그대로 return
        
        addTodo(inputTodo.trim());     //todos에 todo 추가하자
        setInputTodo('');       //input text 빈칸으로 하자
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
            <Button type="submit" className="todo__button todo__button--add">Add</Button>
        </form>
    )
}
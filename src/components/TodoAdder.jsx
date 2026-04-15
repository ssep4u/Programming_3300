import Button from './Button.jsx'

export default function TodoAdder({ addTodo }) {
    //submit이면 handleSubmit 실행하자
    //handleSubmit
    //text 받아서 addTodo(text)
    return (
        <form className="todo__form">
            <input type="text" placeholder="할 일을 입력하세요." className="todo__input" />
            <Button type="submit" className="todo__button todo__button--add">Add</Button>
        </form>
    )
}
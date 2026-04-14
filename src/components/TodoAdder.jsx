import Button from './Button.jsx'

export default function TodoAdder() {
    return (
        <form className="todo__form">
            <input type="text" placeholder="할 일을 입력하세요." className="todo__input" />
            <Button type="submit" className="todo__button todo__button--add">Add</Button>
        </form>
    )
}
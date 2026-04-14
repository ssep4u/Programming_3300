import TodoItemEmpty from './TodoItemEmpty.jsx'
import TodoItem from './TodoItem.jsx'

export default function TodoList() {
    return (
        <ul className="todo__list">
            <TodoItemEmpty />
            <TodoItem />
        </ul>
    )
}
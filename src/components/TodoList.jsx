import TodoItemEmpty from './TodoItemEmpty.jsx'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ todos, ...rest }) {
    const sortedTodos = [...todos].sort((a, b) => Number(Boolean(b.isPined)) - Number(Boolean(a.isPined)));

    return (
        <ul className="todo__list">
            {/* todos에 값이 없으면, TodoItemEmpty */}
            {todos.length === 0 && <TodoItemEmpty />}
            {/* todos에 값이 있으면, TodoItem에 todo를 넣자 */}
            {todos.length > 0 &&
                sortedTodos.map((todo) =>
                    <TodoItem key={todo.id} todo={todo} {...rest} />
                )
            }
        </ul>
    )
}

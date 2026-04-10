import './todolist.css'

function TodoListApp() {
    return (
        <div className="todo">
            <h1 className="todo__title">No Think, Do It.</h1>
            <form className="todo__form">
                <input type="text" placeholder="할 일을 입력하세요." className="todo__input" />
                <button type="submit" className="todo__button todo__button--add">Add</button>
            </form>
            <ul className="todo__list">
                <li className="todo__item todo__item--empty">
                    <p>할 일 없음.</p>
                </li>
                <li className="todo__item todo__item--complete">
                    <input type="checkbox" id="chk-1" className="todo__check" />
                    <label htmlFor="chk-1" className="todo__label">think</label>
                    <button className="todo__button todo__button--edit">✏️</button>
                    <button className="todo__button todo__button--delete">❌</button>
                </li>
            </ul>
        </div>
    )
}

export default TodoListApp;
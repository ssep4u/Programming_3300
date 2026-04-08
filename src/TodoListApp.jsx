function TodoListApp() {
    return (
        <div>
            <h1>No Think, Do It.</h1>
            <form>
                <input type="text" />
                <button>Add</button>
            </form>
            <ul>
                <li>
                    <input type="checkbox" id="chk-1" />
                    <label htmlFor="chk-1">think</label>
                    <button>✏️</button>
                    <button>❌</button>
                </li>
            </ul>
        </div>
    )
}

export default TodoListApp;
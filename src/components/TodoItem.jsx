import { useState } from 'react'
import Checkbox from './Checkbox.jsx'
import Button from './Button.jsx'

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
    const [isEditing, setIsEditing] = useState(false);  //수정중인지 아닌지
    const [editText, setEditText] = useState(todo.text);    //수정한 text
    function handleEditClick() {
        if (!isEditing) {
            //edit 시작
            setIsEditing(true);
            setEditText(todo.text);
        } else {
            //edit 끝
            const trimmedText = editText.trim();
            if (trimmedText !== todo.text && trimmedText !== "") {     //이전 값과 같지 않고, 빈칸이 아니면
                editTodo(todo.id, trimmedText);                        //editTodo
            }
            setIsEditing(false);
        }
    }
    return (
        // todo.isCompleted가 true면 todo__item--complete 클래스 추가, 아니면 말고
        <li className={`todo__item${todo.isCompleted ? " todo__item--complete" : ""}`}>
            {/* 수정중이 아니면 */}
            {!isEditing &&
                <Checkbox
                    id={todo.id}
                    checked={todo.isCompleted}
                    onChange={() => toggleTodo(todo.id)}
                >{todo.text}</Checkbox>
            }
            {/* 수정중이면 */}
            {isEditing &&
                <input
                    type="text"
                    className='todo__input--edit'
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    //enter 치면 handleEditClick()
                    onKeyUp={(event) => {event.key === 'Enter' && handleEditClick()}}
                    autoFocus
                />
            }


            <Button
                className="todo__button todo__button--edit"
                onClick={handleEditClick}
            >✏️</Button>
            <Button
                className="todo__button todo__button--delete"
                onClick={() => deleteTodo(todo.id)}
            >❌</Button>
        </li>
    )
}
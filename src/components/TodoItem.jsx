import { useState } from 'react'
import Checkbox from './Checkbox.jsx'
import Button from './Button.jsx'
import confetti from "canvas-confetti";

export default function TodoItem({
    todo,
    toggleTodo,
    deleteTodo,
    editTodo
}) {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    // ⚾ 야구공 + 💥 유리 깨짐 + 🎉 폭죽
    function playCeremony() {

        // 야구공 생성
        const ball = document.createElement("div");
        ball.innerHTML = "⚾";
        ball.style.position = "fixed";
        ball.style.left = "-100px";
        ball.style.top = "50%";
        ball.style.fontSize = "70px";
        ball.style.zIndex = "9999";
        ball.style.transition = "all 0.7s ease-in-out";
        document.body.appendChild(ball);

        // 날아가기
        setTimeout(() => {
            ball.style.left = "50%";
            ball.style.top = "40%";
            ball.style.transform = "rotate(720deg) scale(1.4)";
        }, 10);

        // 충돌
        setTimeout(() => {

            // 유리 깨짐 효과
            const crack = document.createElement("div");

            crack.innerHTML = `
                <div style="
                    position:fixed;
                    inset:0;
                    background:
                    radial-gradient(circle at center,
                    rgba(255,255,255,0.9) 1px,
                    transparent 2px);
                    backdrop-filter: blur(1px);
                    z-index:9998;
                    animation: crackFlash 0.5s ease;
                "></div>
            `;

            document.body.appendChild(crack);

            // confetti
            confetti({
                particleCount: 250,
                spread: 180,
                startVelocity: 45,
                scalar: 1.2,
                origin: { y: 0.6 }
            });

            // 흔들림
            document.body.style.animation = "shake 0.4s";

            // 제거
            setTimeout(() => {
                document.body.style.animation = "";
                crack.remove();
                ball.remove();
            }, 600);

        }, 700);
    }

    // 체크
    function handleToggle() {

        if (!todo.isCompleted) {
            playCeremony();
        }

        toggleTodo(todo.id);
    }

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodo, togglePinTodo }) {
    const [isEditing, setIsEditing] = useState(false);  //수정중인지 아닌지
    const [editText, setEditText] = useState(todo.text);    //수정한 text

    function handleEditClick() {

        if (!isEditing) {

            setIsEditing(true);
            setEditText(todo.text);

        } else {

            const trimmedText = editText.trim();

            if (
                trimmedText !== todo.text &&
                trimmedText !== ""
            ) {
                editTodo(todo.id, trimmedText);
            }

            setIsEditing(false);
        }
    }

    function handleCancelEdit() {
        setEditText(todo.text);
        setIsEditing(false);
    }

    return (
        // todo.isCompleted가 true면 todo__item--complete 클래스 추가, 아니면 말고
        <li className={`todo__item${todo.isCompleted ? " todo__item--complete" : ""}${todo.isPined ? " todo__item--pined" : ""}`}>
            {/* 수정중이 아니면 */}
            {!isEditing &&
                <Checkbox
                    id={todo.id}
                    checked={todo.isCompleted}
                    onChange={handleToggle}
                >
                    {todo.text}
                </Checkbox>
            }

            {isEditing &&
                <input
                    type="text"
                    className='todo__input--edit'
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            handleEditClick();
                        }

                        if (event.key === 'Escape') {
                            handleCancelEdit();
                        }
                    }}
                    autoFocus
                />
            }

            <span>{new Date(todo.id).toLocaleString()}</span>
            <Button
                className="todo__button todo__button--edit"
                onClick={handleEditClick}
            >
                {isEditing ? "💾" : "✏️"}
            </Button>

            <Button
                className="todo__button todo__button--delete"
                onClick={() => deleteTodo(todo.id)}
            >❌</Button>
            <Button
                className={`todo__button todo__button--pin${todo.isPined ? " todo__button--pined" : ""}`}
                onClick={() => togglePinTodo(todo.id)}
            >{todo.isPined ? "📍" : "📌"}</Button>
        </li>
    )
}

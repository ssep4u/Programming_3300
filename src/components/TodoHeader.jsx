import Button from './Button.jsx'

export default function TodoHeader({ copyShareLink }) {
    return (
        <header className="todo__header">
            <h1 className="todo__title">No Think, Do It.</h1>
            <Button
                type="button"
                className="todo__button todo__button--share"
                onClick={copyShareLink}
            >링크 복사</Button>
        </header>
    )
}

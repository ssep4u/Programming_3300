export default function Checkbox(props) {
    const { children, id, date, ...rest } = props;
    return (
        <>
            <input type="checkbox" id={`chk-${id}`} className="todo__check" {...rest} />
            <label htmlFor={`chk-${id}`} className="todo__label">{children}</label>
            <input type="datetime-local" value={date} disabled />
        </>
    )
};
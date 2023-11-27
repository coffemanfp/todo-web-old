export function TaskPanelButton({ register, register_name, option, text, type, icon }) {
    const onClick = type === 'checkbox' ? undefined : e => e.target.showPicker()

    return (
        <label className={"task-panel__button" + (option ? ' task-panel__button--active' : '')}>
            <input type={type} className="task-panel__button-input"
                {...register(register_name)}
                onClick={onClick}
            />
            <i className={"task-panel__button-icon " + icon}></i>
            {text}
        </label>
    )
}
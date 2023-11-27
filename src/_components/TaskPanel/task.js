import { useWatch } from "react-hook-form"

export function Task({ register, control }) {
    const { is_done, is_important } =
        useWatch({ control, names: ["is_done", "is_important"] })

    const DoneButton = ({ isDone }) => (
        <label className={"task__button task__button--done-toggler" + (isDone ? ' task__button--active' : '')} >
            <input type="checkbox" className="task__button-input"
                {...register("is_done")} />
            <i className={"bx " + (isDone ? "bxs-check-circle" : "bx-circle")}
                onMouseEnter={e => { if (!e.target.className.includes("bxs-check-circle")) e.target.className = 'bx bx-check-circle' }}
                onMouseLeave={e => { if (!e.target.className.includes("bxs-check-circle")) e.target.className = 'bx bx-circle' }}></i>
        </label>
    )
    const TitleInput = () => (
        <input type="text" className="task__input task__input--editable"
            {...register("title", { required: true })} />
    )
    const ImportantButton = ({ isImportant }) => {
        return (
            <label className={"task__button task__button--important-toggler" + (isImportant ? ' task__button--active' : '')}>
                <input type="checkbox" className="task__button-input"
                    {...register("is_important")} />
                <i className={"bx " + (isImportant ? "bxs-star" : "bx-star")}></i>
            </label>)
    }

    return (
        <div className="task">
            <DoneButton isDone={is_done} />
            <TitleInput />
            <ImportantButton isImportant={is_important} />
        </div >
    )
}
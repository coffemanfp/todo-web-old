import { useDispatch } from "react-redux"
import { taskActions } from "../../_store/taskSlice"
import { useNavigate } from "react-router-dom"

export function RemoveTaskButton({ taskId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const removeTask = () => {
        dispatch(taskActions.delete(parseInt(taskId)))
        navigate('../')
    }

    return (
        <button type="button" className="task-panel__button task-panel__button--remove"
            onClick={removeTask}>
            <i className="task-panel__button-icon bx bx-trash"></i> Delete
        </button>
    )
}
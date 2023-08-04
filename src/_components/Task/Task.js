import React from 'react'
import './Task.scss'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { taskActions } from '../../_store/taskSlice'
import { useNavigate } from 'react-router-dom'

export default function Task(props) {
    const { register, handleSubmit } = useForm({ defaultValues: { ...props.task } })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = task => {
        dispatch(taskActions.update(task))
    }
    const onClick = () => {
        navigate('task/' + props.task.id.toString())
    }
    return (
        <form className="task" onSubmit={handleSubmit(onSubmit)} onClick={onClick} >
            <button type="button" className="task__indicator"><i className="bx bx-circle"></i></button>
            <input type="text" className="task__title task__title--editable"
                {...register("title", { required: true })} />
            <button type="button" className={"task__important-marker" + props.task?.is_important ? ' task__important-marker--active' : ''}><i className="bx bx-star"></i></button>
        </form>
    )
}
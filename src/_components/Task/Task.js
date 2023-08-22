import React, { useEffect } from 'react'
import './Task.scss'
import { useForm, useWatch } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { taskActions } from '../../_store/taskSlice'
import { useNavigate } from 'react-router-dom'

export default function Task({ task }) {
    const { register, handleSubmit, control, watch } = useForm({ defaultValues: { ...task } })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { is_important, is_done } = useWatch({ control, names: ["is_important", "is_done"] })
    const onSubmit = task =>
        dispatch(taskActions.update(task))

    const openTaskPanel = e => {
        if (e.target.className.includes('task__input')) navigate('task/' + task.id.toString())
    }

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name !== 'title') {
                onSubmit(value)
            }
        })
        return () => subscription.unsubscribe()
    })

    let typingTimer
    return (
        <form className="task" onClick={openTaskPanel} >
            <label className={"task__button task__button--done-toggler" + (is_done ? ' task__button--active' : '')} >
                <input type="checkbox" className="task__button-input"
                    {...register("is_done")} />
                <i className={"bx " + (is_done ? "bxs-check-circle" : "bx-circle")}
                    onMouseEnter={e => { if (!e.target.className.includes("bxs-check-circle")) e.target.className = 'bx bx-check-circle' }}
                    onMouseLeave={e => { if (!e.target.className.includes("bxs-check-circle")) e.target.className = 'bx bx-circle' }}></i>
            </label>
            <input type="text" className="task__input task__input--editable"
                onKeyUp={() => {
                    clearTimeout(typingTimer)
                    typingTimer = setTimeout(handleSubmit(onSubmit), 500)
                }}
                onKeyDown={() => {
                    clearTimeout(typingTimer)
                }}
                {...register("title", { required: true })} />
            <label className={"task__button task__button--important-toggler" + (is_important ? ' task__button--active' : '')}>
                <input type="checkbox" className="task__button-input"
                    {...register("is_important")} />
                <i className={"bx " + (is_important ? "bxs-star" : "bx-star")}></i>
            </label>
        </form >
    )
}
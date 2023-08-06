import React, { useEffect, useState } from 'react'
import './TaskPanel.scss'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useWatch } from 'react-hook-form'
import { DateTime } from 'luxon'
import { taskActions } from '../../_store/taskSlice'
import { createURL, fetchWrapper } from '../../_helpers/fetch-wrapper'
import { deleteFieldsIfEmpty } from '../../_helpers/delete-field-if-empty'

export default function TaskPanel() {
    const [reloadTasks] = useOutletContext()
    const { taskId } = useParams()
    const [task, setTask] = useState()
    const [getOneTaskStatus, setGetOneTaskStatus] = useState('idle')
    const dispatch = useDispatch()
    const taskStatus = useSelector(state => state.task.status)
    const { register, handleSubmit, control, reset } = useForm({ defaultValues: { ...task } })
    const { due_date, reminder, repeat, is_added_to_my_day, is_important } = useWatch({ control, names: ["due_date", "reminder", "repeat", "is_added_to_my_day", "is_important"] })
    const navigate = useNavigate()
    const onSubmit = task => {
        deleteFieldsIfEmpty(task, ["due_date", "reminder", "repeat"])
        if (taskStatus === 'idle' || taskStatus === 'completed') {
            const fetchUpdate = async () => {
                dispatch(taskActions.update(task))
            }
            fetchUpdate()
                .then(() => {
                    reloadTasks()
                })
        }
    }
    const removeTask = () => {
        dispatch(taskActions.delete(taskId))
        reloadTasks()
        navigate('../')
    }

    useEffect(() => {
        const fetchData = async () => {
            setGetOneTaskStatus('loading')

            await fetchWrapper.get(createURL('task/' + taskId))
                .then(task => {
                    setTask(task)
                })
                .catch(error => {
                    console.error(error)
                })
                .finally(() => {
                    setGetOneTaskStatus('idle')
                })
        }

        if (getOneTaskStatus === 'idle') {
            fetchData()
                .catch(console.error)
        }
    }, [taskId])

    useEffect(() => {
        reset({ ...task })
    }, [reset, task])

    return (
        <form className="task-panel" onSubmit={handleSubmit(onSubmit)}>
            <div className="task">
                <span className="task__button task__button--indicator"><i className="bx bx-circle"></i></span>
                <input type="text" className="task__input task__input--editable"
                    {...register("title", { required: true })} />
                <label className={"task__button task__button--important-toggler" + (is_important ? ' task__button--active' : '')}>
                    <input type="checkbox" className="task__button-input"
                        {...register("is_important")} />
                    <i className={"bx " + (is_important ? "bxs-star" : "bx-star")}></i>
                </label>
            </div>
            <label className={"task-panel__button" + (is_added_to_my_day ? ' task-panel__button--active' : '')}>
                <input type="checkbox" className="task-panel__button-input"
                    {...register("is_added_to_my_day")}
                />
                <i className="task-panel__button-icon bx bx-sun"></i>
                {is_added_to_my_day ? 'Added' : 'Add'} to my day
            </label>
            <div className="task-panel__container">
                <label className={"task-panel__button" + (due_date ? ' task-panel__button--active' : '')} >
                    <input type='date' className="task-panel__button-input"
                        {...register("due_date", { required: false })}
                        onClick={e => e.target.showPicker()}
                    />
                    <i className="task-panel__button-icon bx bx-calendar"></i>
                    {due_date ? DateTime.fromISO(due_date).toFormat('ccc., LLLL d') : 'Add a due date'}
                </label>
                <label className={"task-panel__button" + (reminder ? ' task-panel__button--active' : '')}>
                    <input type='datetime-local' className="task-panel__button-input"
                        onClick={e => e.target.showPicker()}
                        {...register("reminder")}
                    />
                    <i className="task-panel__button-icon bx bx-bell"></i>
                    {reminder ? DateTime.fromISO(reminder).toFormat('ccc., LLLL d') : 'Remind me'}
                </label>
                <label className={"task-panel__button" + (repeat ? ' task-panel__button--active' : '')}>
                    <input type='date' className="task-panel__button-input"
                        onClick={e => e.target.showPicker()}
                        {...register("repeat")}
                    />
                    <i className="task-panel__button-icon bx bx-repost"></i>
                    {repeat ? DateTime.fromISO(repeat).toFormat('ccc., LLLL d') : 'Repeat'}
                </label>
            </div>
            <button className="task-panel__button"><i className="task-panel__button-icon bx bx-purchase-tag-alt"></i> Pick a category</button>
            <textarea className="task-panel__description" placeholder='Add a description...'
                {...register("description", { maxLength: 5000 })}></textarea>
            <button className="task-panel__button task-panel__button--remove"
                onClick={removeTask}>
                <i className="task-panel__button-icon bx bx-trash"></i> Delete
            </button>
            <footer className="task-panel__footer">
                <button className="task-panel__footer-button" onClick={() => navigate('../')}><i className="bx bx-exit"></i></button>
                <br className="task-panel__footer-separator" />
                <button type="submit" className="task-panel__footer-button task-panel__footer-button--done"><i className="bx bx-check"></i></button>
            </footer>
        </form >
    )
}
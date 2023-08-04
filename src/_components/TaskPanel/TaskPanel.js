import React, { useEffect, useState } from 'react'
import './TaskPanel.scss'
import { useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useWatch } from 'react-hook-form'
import { DateTime } from 'luxon'
import { taskActions } from '../../_store/taskSlice'
import { createURL, fetchWrapper } from '../../_helpers/fetch-wrapper'

export default function TaskPanel() {
    const [reloadTasks] = useOutletContext()
    const { taskId } = useParams()
    const [task, setTask] = useState()
    const [getOneTaskStatus, setGetOneTaskStatus] = useState('idle')
    const dispatch = useDispatch()
    const taskStatus = useSelector(state => state.task.status)
    const { register, handleSubmit, control, reset } = useForm({ defaultValues: { ...task } })
    const { due_date, reminder, repeat, is_added_to_my_day } = useWatch({ control, names: ["due_date", "reminder", "repeat", "is_added_to_my_day"] })
    const onSubmit = task => {
        deleteFieldIfEmpty(task, "due_date")
        deleteFieldIfEmpty(task, "reminder")
        deleteFieldIfEmpty(task, "repeat")
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
                <button type="button" className="task__indicator"><i className="bx bx-circle"></i></button>
                <input type="text" className="task__title task__title--editable"
                    {...register("title", { required: true })} />
                <button type="button" className={"task__important-marker" + task?.is_important ? ' task__important-marker--active' : ''}><i className="bx bx-star"></i></button>
            </div>
            <label htmlFor="task-panel__is-added-to-my-day" className={"task-panel__button" + (is_added_to_my_day ? ' task-panel__button--active' : '')}>
                <input id="task-panel__is-added-to-my-day" type="checkbox" className="task-panel__button-input"
                    {...register("is_added_to_my_day")}
                />
                <i className="task-panel__button-icon bx bx-sun"></i>
                {is_added_to_my_day ? 'Added' : 'Add'} to my day
            </label>
            <div className="task-panel__container">
                <label className='task-panel__button' htmlFor="due_date" >
                    <input id='due_date' type='date' className="task-panel__button-input"
                        {...register("due_date", { required: false })}
                        onClick={e => e.target.showPicker()}
                    />
                    <i className="task-panel__button-icon bx bx-calendar"></i>
                    {/* {getFieldContent(due_date, task?.due_date, 'Add a due date')} */}
                    {due_date ? DateTime.fromISO(due_date).toFormat('ccc., LLLL d') : 'Add a due date'}
                </label>
                <label className="task-panel__button">
                    <input id='reminder' type='datetime-local' className="task-panel__button-input"
                        onClick={e => e.target.showPicker()}
                        {...register("reminder")}
                    />
                    <i className="task-panel__button-icon bx bx-bell"></i>
                    {reminder ? DateTime.fromISO(reminder).toFormat('ccc., LLLL d') : 'Remind me'}
                </label>
                <label className="task-panel__button">
                    <input id='repeat' type='date' className="task-panel__button-input" />
                    <i className="task-panel__button-icon bx bx-repost"></i>
                    {repeat ? DateTime.fromISO(repeat).toFormat('ccc., LLLL d') : 'Repeat'}
                </label>
            </div>
            <button className="task-panel__button"><i className="task-panel__button-icon bx bx-purchase-tag-alt"></i> Pick a category</button>
            <textarea className="task-panel__description" placeholder='Add a description...'></textarea>
            <footer className="task-panel__footer">
                <button className="task-panel__footer-button task-panel__footer-button--remove"><i className="bx bx-trash"></i></button>
                <br className="task-panel__footer-separator" />
                <button type="submit" className="task-panel__footer-button task-panel__footer-button--done"><i className="bx bx-check"></i></button>
            </footer>
        </form >
    )

    function deleteFieldIfEmpty(obj, fieldName) {
        if (obj[fieldName] === '') {
            delete obj[fieldName]
        }
        return obj
    }
}

/*
    1. Hacer que el formulario tenga los valores por defecto de los que vengan en la task original.
    2. Donde se vaya a hacer display de los valores, obtener los valores por la funcion de watch de react-hook-form
    3. Ese valor hay que formatearlo a un valor mostrable para el usuario.

*/
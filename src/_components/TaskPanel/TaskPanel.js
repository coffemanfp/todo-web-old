import React, { useEffect, useState } from 'react'
import './TaskPanel.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useWatch } from 'react-hook-form'
import { DateTime } from 'luxon'
import { taskActions } from '../../_store/taskSlice'
import { createURL, fetchWrapper } from '../../_helpers/fetch-wrapper'
import { deleteFieldsIfEmpty } from '../../_helpers/delete-field-if-empty'
import { Task } from './task'
import { TaskPanelButton } from './task_panel_button'
import { CategoryPicker } from './category_picker'
import { RemoveTaskButton } from './remove_task_button'
import { Footer } from './footer'

export default function TaskPanel() {
    const { taskId } = useParams()
    const [task, setTask] = useState()
    const [getOneTaskStatus, setGetOneTaskStatus] = useState('idle')
    const dispatch = useDispatch()
    const taskStatus = useSelector(state => state.task.status)
    const { register, handleSubmit, control, reset, setValue } = useForm({ defaultValues: { ...task } })
    const { due_date, reminder, repeat, is_added_to_my_day } =
        useWatch({ control, names: ["due_date", "reminder", "repeat", "is_added_to_my_day"] })
    const onSubmit = task => {
        deleteFieldsIfEmpty(task, ["due_date", "reminder", "repeat"])
        if (taskStatus === 'idle' || taskStatus === 'completed') {
            dispatch(taskActions.update(task))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setGetOneTaskStatus('loading')

            await fetchWrapper.get(createURL('tasks/' + taskId))
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
            <Task register={register} control={control} />
            <TaskPanelButton
                register={register}
                register_name={'is_added_to_my_day'}
                option={is_added_to_my_day}
                text={(is_added_to_my_day ? 'Added' : 'Add') + " to my day"}
                icon="bx bx-sun"
                type="checkbox"
            />

            <div className="task-panel__container">
                <TaskPanelButton
                    register={register}
                    register_name={'due_date'}
                    option={due_date}
                    text={due_date ? DateTime.fromISO(due_date).toFormat('ccc., LLLL d') : 'Add a due date'}
                    icon="bx bx-calendar"
                    type="date"
                />
                <TaskPanelButton
                    register={register}
                    register_name={'reminder'}
                    option={reminder}
                    text={reminder ? DateTime.fromISO(reminder).toFormat('ccc., LLLL d') : 'Remind me'}
                    icon="bx bx-bell"
                    type="datetime-local"
                />
                <TaskPanelButton
                    register={register}
                    register_name={'repeat'}
                    option={repeat}
                    text={repeat ? DateTime.fromISO(repeat).toFormat('ccc., LLLL d') : 'Repeat'}
                    icon="bx bx-repost"
                    type="date"
                />
            </div>

            <CategoryPicker register={register} control={control} setValue={setValue} />
            <textarea className="task-panel__description" placeholder='Add a description...'
                {...register("description", { maxLength: 5000 })}></textarea>
            <RemoveTaskButton taskId={taskId} />
            <Footer />
        </form >
    )
}
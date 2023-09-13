import React, { useEffect, useState } from 'react'
import './TaskPanel.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useWatch } from 'react-hook-form'
import { DateTime } from 'luxon'
import { taskActions } from '../../_store/taskSlice'
import { createURL, fetchWrapper } from '../../_helpers/fetch-wrapper'
import { deleteFieldsIfEmpty } from '../../_helpers/delete-field-if-empty'

export default function TaskPanel() {
    const { taskId } = useParams()
    const [task, setTask] = useState()
    const [getOneTaskStatus, setGetOneTaskStatus] = useState('idle')
    const dispatch = useDispatch()
    const taskStatus = useSelector(state => state.task.status)
    const { register, handleSubmit, control, reset, setValue } = useForm({ defaultValues: { ...task } })
    const { due_date, reminder, repeat, is_added_to_my_day, is_important, categories } =
        useWatch({ control, names: ["due_date", "reminder", "repeat", "is_added_to_my_day", "is_important", "categories"] })
    const navigate = useNavigate()
    const onSubmit = task => {
        deleteFieldsIfEmpty(task, ["due_date", "reminder", "repeat"])
        if (taskStatus === 'idle' || taskStatus === 'completed') {
            dispatch(taskActions.update(task))
        }
    }
    const removeTask = () => {
        dispatch(taskActions.delete(parseInt(taskId)))
        navigate('../')
    }
    const [isCategoryPickerActive, setIsCategoryPickerActive] = useState(false)
    let globalCategories = useSelector(state => state.category.categories)
    let [aux, setAux] = useState(globalCategories)
    console.log(aux)

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
    
    const removeTaskCategory = e => {
        const newCategories = categories.filter(c => {
            return c.color !== e.target.id
        })
        setValue('categories', newCategories)
    }

    const addTaskCategory = e => {
        console.log("Hola!", e)
        const newCategory = {
            name: e.target.id,
            color: e.target.id,
        }
        const newCategories = categories ? [...categories, newCategory] : [newCategory]
        setValue('categories', newCategories)
        setIsCategoryPickerActive(false)
        console.log("----------------")
        console.log(globalCategories)
        globalCategories = globalCategories.filter(c => {
            return c.color !== e.target.id
        })
        console.log(globalCategories)
    }

    const handleCategoryPicker = e => {
        if (e.target.className === 'task-panel__button') {
            setIsCategoryPickerActive(!isCategoryPickerActive)
        }
    }

    const categoriesMap = new Map(categories?.map(c => [c.id, true]))
    const categoriesElem = globalCategories?.map(c => {
        console.log("se colvio a hacer?", c)
        if (!categoriesMap.has(c.id)) {
            return (
                <label key={c.color} className={"category-picker__option category-picker__option--" + c.color}>
                    Category {c.color}
                    <input id={c.color} type="checkbox" className="task-panel__button-input"
                        onClick={addTaskCategory}
                    />
                </label>
            )
        }
    })

    const taskCategoriesElem = categories?.map(c => {
        return (
            <label key={c.color} className={"task-panel__category task-panel__category--" + c.color}>
                {c.color}
                <input id={c.color} type="checkbox" className="task-panel__button-input"
                    onClick={removeTaskCategory}
                />
            </label>
        )
    })

    return (
        <form className="task-panel" onSubmit={handleSubmit(onSubmit)}>
            <div className="task">
                <label className={"task__button task__button--done-toggler" + (task?.is_done ? ' task__button--active' : '')} >
                    <input type="checkbox" className="task__button-input"
                        {...register("is_done")} />
                    <i className={"bx " + (task?.is_done ? "bxs-check-circle" : "bx-circle")}
                        onMouseEnter={e => { if (!e.target.className.includes("bxs-check-circle")) e.target.className = 'bx bx-check-circle' }}
                        onMouseLeave={e => { if (!e.target.className.includes("bxs-check-circle")) e.target.className = 'bx bx-circle' }}></i>
                </label>
                <input type="text" className="task__input task__input--editable"
                    {...register("title", { required: true })} />
                <label className={"task__button task__button--important-toggler" + (is_important ? ' task__button--active' : '')}>
                    <input type="checkbox" className="task__button-input"
                        {...register("is_important")} />
                    <i className={"bx " + (is_important ? "bxs-star" : "bx-star")}></i>
                </label>
            </div >
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
            <button type="button" className="task-panel__button" onClick={handleCategoryPicker}>
                <i className="task-panel__button-icon bx bx-purchase-tag-alt"></i>
                <div className="task-panel__categories">
                    {taskCategoriesElem}
                </div>
                Pick a category
                {isCategoryPickerActive &&
                    <ul className="category-picker">
                        <input type="text" className="task-panel__button-input"
                            {...register('categories')}
                        />
                        {categoriesElem}
                    </ul>
                }
            </button>
            <textarea className="task-panel__description" placeholder='Add a description...'
                {...register("description", { maxLength: 5000 })}></textarea>
            <button type="button" className="task-panel__button task-panel__button--remove"
                onClick={removeTask}>
                <i className="task-panel__button-icon bx bx-trash"></i> Delete
            </button>
            <footer className="task-panel__footer">
                <button type="button" className="task-panel__footer-button" onClick={() => navigate('../')}><i className="bx bx-exit"></i></button>
                <br className="task-panel__footer-separator" />
                <button type="submit" className="task-panel__footer-button task-panel__footer-button--done"><i className="bx bx-check"></i></button>
            </footer>
        </form >
    )
}
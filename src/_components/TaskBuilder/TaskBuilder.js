import React, { useEffect } from 'react'
import './TaskBuilder.scss'
import { useDispatch } from 'react-redux';
import { taskActions } from '../../_store/taskSlice'
import { useForm } from 'react-hook-form'

export default function TaskBuilder() {
    const { register, handleSubmit, reset, formState } = useForm()
    const dispatch = useDispatch()
    const onSubmit = task => {
        dispatch(taskActions.add(task))
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset()
        }
    }, [formState, reset])

    return (
        <form className="task-builder" onSubmit={handleSubmit(onSubmit)}>
            <button type="submit" className="task-builder__submit">
                <i className="bx bx-plus"></i>
            </button>
            <input type="text" className="task-builder__input" maxLength={255} autoFocus
                {...register("title", { required: true, maxLength: 255 })} />
            <div className="task-builder__buttons">
                <label className="task-builder__button">
                    <input type="date" className="task-builder__button-input"
                        onClick={e => e.target.showPicker()}
                        {...register("due_date")} />
                    <i className="bx bx-calendar"></i>
                </label>
                <label className="task-builder__button">
                    <input type="datetime-local" className="task-builder__button-input"
                        onClick={e => e.target.showPicker()}
                        {...register("reminder")} />
                    <i className="bx bx-bell"></i>
                </label>
                <label className="task-builder__button">
                    <input type="date" className="task-builder__button-input"
                        onClick={e => e.target.showPicker()}
                        {...register("repeat")} />
                    <i className="bx bx-repost"></i>
                </label>
            </div>
        </form>
    )
}
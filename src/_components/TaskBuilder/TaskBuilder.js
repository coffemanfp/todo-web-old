import React, { useEffect } from 'react'
import './TaskBuilder.scss'
import { useDispatch } from 'react-redux';
import { taskActions } from '../../_store/taskSlice'
import { useForm } from 'react-hook-form'

export default function TaskBuilder() {
    const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful } } = useForm()
    const dispatch = useDispatch()
    const onSubmit = task => {
        console.log(task)
        dispatch(taskActions.add(task))
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ title: "" })
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
                <button className="task-builder__due">
                    <i className="bx bx-calendar"></i>
                </button>
                <button className="task-builder__notificate">
                    <i className="bx bx-bell"></i>
                </button>
                <button className="task-builder__repeat">
                    <i className="bx bx-repost"></i>
                </button>
            </div>
        </form>
    )
}
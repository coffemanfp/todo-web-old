import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { taskActions } from '../../_store/taskSlice'
import Task from '../Task/Task'

export default function TaskLoader(props) {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task.tasks)
    const searchStatus = useSelector(state => state.task.searchStatus)
    // useEffect(() => {
    if (searchStatus === 'idle') {
        console.log("que?")
        let search = {}
        switch (props.filterBy.category) {
            case 'important':
                search.isImportant = true
                break
            case 'done':
                search.isDone = true
                break
            case 'today':
                search.isAddedToMyDay = true
                break
            case 'planned':
                search.hasDueDate = true
                break
            case 'expireSoon':
                search.expireSoon = true
                break
        }
        console.log(search)
        dispatch(taskActions.search(search))
    }

    // }, [searchStatus, dispatch])
    let doneTasks = []
    let pendingTasks = []
    if (searchStatus === 'completed') {
        console.log("paso por aca")
        const orderedTasks = tasks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        orderedTasks.map(t => {
            console.log(t)
            const e = <Task key={t.id} task={t}></Task>
            return t.is_done ? doneTasks.push(e) : pendingTasks.push(e)
        })
    }

    return (
        <>
            {pendingTasks}
            {doneTasks.length > 0 &&
                <div className="dashboard__tasks dashboard__tasks--done">
                    <p className="dashboard__title">
                        <i className='bx bxs-chevron-down'></i>
                        Done
                        <span className="dashboard__title-number">{doneTasks.length}</span>
                    </p>
                    {doneTasks}
                </div>
            }
        </>
    )
}
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { taskActions } from '../../_store/taskSlice'
import Task from '../Task/Task'
import { taskCategoryToSearch } from '../../_helpers/task-category-to-search'


export default function TaskLoader(props) {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task.tasks)
    const searchStatus = useSelector(state => state.task.searchStatus)
    const fetchedCategory = useSelector(state => state.task.fetchedCategory)

    if (searchStatus === 'idle' || (searchStatus === 'completed' && props.filterBy.category !== fetchedCategory)) {
        let search = taskCategoryToSearch(props.filterBy.category)
        search.category = props.filterBy.category
        dispatch(taskActions.search(search))
    }

    let doneTasks = []
    let pendingTasks = []
    if (searchStatus === 'completed') {
        const orderedTasks = tasks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        orderedTasks.map(t => {
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
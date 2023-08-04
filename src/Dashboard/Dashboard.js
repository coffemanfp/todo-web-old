import React, { useEffect } from 'react'
import './Dashboard.scss'
import Search from '../_components/Search/Search'
import UserButton from '../_components/UserButton/UserButton'
import TaskBuilder from '../_components/TaskBuilder/TaskBuilder'
import Menu from '../_components/Menu/Menu'
import Task from '../_components/Task/Task'
import { useDispatch, useSelector } from 'react-redux'
import { taskActions } from '../_store/taskSlice'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task.tasks)
    const taskStatus = useSelector(state => state.task.status)
    const reloadTasks = () => {
        if (taskStatus === 'idle' || taskStatus === 'completed') {
            dispatch(taskActions.getAll())
        }
    }
    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(taskActions.getAll())
        }
    }, [taskStatus, dispatch])

    let content
    if (taskStatus === 'completed') {
        const orderedTasks = tasks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        content = orderedTasks.map(task => {
            return (<Task key={task.id} task={task} ></Task >)
        })
    }

    return (
        <div className="dashboard">
            <div className="dashboard__content">
                <header className="dashboard__header">
                    <button className="dashboard__menu-toggler">
                        <i className='bx bx-menu-alt-left'></i>
                    </button>
                    <Search className={"dashboard__search"} />
                    <div className="dashboard__header-buttons">
                        <button className="dashboard__header-button">
                            <i className="bx bx-bell"></i>
                        </button>
                        <UserButton></UserButton>
                    </div>
                </header>
                <div className="dashboard__container">
                    <aside className="dashboard__aside">
                        <Menu></Menu>
                    </aside>
                    <main className="dashboard__main">
                        <TaskBuilder></TaskBuilder>
                        <div className="dashboard__tasks">
                            {content}
                        </div>
                    </main>
                    <aside className="dashboard__aside">
                        <Outlet context={[reloadTasks]} />
                    </aside>
                </div>
            </div>
        </div>
    )
}

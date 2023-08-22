import React, { useEffect, useState } from 'react'
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
    const [toggleMenu, setToggleMenu] = useState(true)
    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(taskActions.getAll())
        }
    }, [taskStatus, dispatch])

    let doneTasks = []
    let pendingTasks = []
    if (taskStatus === 'completed') {
        const orderedTasks = tasks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        orderedTasks.map(t => {
            const e = <Task key={t.id} task={t}></Task>
            return t.is_done ? doneTasks.push(e) : pendingTasks.push(e)
        })
    }

    return (
        <div className="dashboard">
            <div className="dashboard__content">
                <header className="dashboard__header">
                    <button className="dashboard__menu-toggler" onClick={() => setToggleMenu(!toggleMenu)}>
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
                        {toggleMenu && <Menu></Menu>}
                    </aside>
                    <main className="dashboard__main">
                        <TaskBuilder></TaskBuilder>
                        <div className="dashboard__tasks">
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
                        </div>
                    </main>
                    <aside className="dashboard__aside">
                        <Outlet />
                    </aside>
                </div>
            </div>
        </div>
    )
}

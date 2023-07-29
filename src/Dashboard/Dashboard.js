import React from 'react'
import './Dashboard.scss'
import Search from '../_components/Search/Search'
import UserButton from '../_components/UserButton/UserButton'
import TaskBuilder from '../_components/TaskBuilder/TaskBuilder'
import Menu from '../_components/Menu/Menu'
import Task from '../_components/Task/Task'
import TaskPanel from '../_components/TaskPanel/TaskPanel'

export default function Dashboard() {
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
                    <main className="dashboard__todos">
                        <TaskBuilder></TaskBuilder>
                        <Task></Task>
                    </main>
                    <aside className="dashboard__aside">
                        <TaskPanel></TaskPanel>
                    </aside>
                </div>
            </div>
        </div>
    )
}
import React, { useState } from 'react'
import './Dashboard.scss'
import Search from '../_components/Search/Search'
import UserButton from '../_components/UserButton/UserButton'
import TaskBuilder from '../_components/TaskBuilder/TaskBuilder'
import Menu from '../_components/Menu/Menu'
import { Outlet, useParams } from 'react-router-dom'
import TaskLoader from '../_components/TaskLoader/TaskLoader'

export default function Dashboard() {
    const { category = 'all' } = useParams()
    const [toggleMenu, setToggleMenu] = useState(true)

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
                            <TaskLoader filterBy={{ category }} />
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

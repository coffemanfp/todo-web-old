import React, { useState } from 'react'
import './Dashboard.scss'
import Search from '../_components/Search/Search'
import UserButton from '../_components/UserButton/UserButton'
import TaskBuilder from '../_components/TaskBuilder/TaskBuilder'
import Menu from '../_components/Menu/Menu'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import TaskLoader from '../_components/TaskLoader/TaskLoader'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../_store/authSlice'
import { categoryActions } from '../_store/categorySlice'
 
export default function Dashboard() {
    const { category = 'all' } = useParams()
    const [toggleMenu, setToggleMenu] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const categoryStatus = useSelector(state => state.category.status)

    if (categoryStatus === 'idle') {
        dispatch(categoryActions.getAllCategories())
    }

    const signout = () => {
        dispatch(authActions.logout())
        navigate('/login')
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
                            <TaskLoader filterBy={{ category }} />
                        </div>
                        <footer className="dashboard__footer">
                            <button className="dashboard__sign-out" onClick={signout}>Sign out</button>
                        </footer>
                    </main>
                    <aside className="dashboard__aside">
                        <Outlet />
                    </aside>
                    
                </div>
            </div>
        </div>
    )
}

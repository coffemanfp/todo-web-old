import React from 'react'
import './Menu.scss'
import { Link } from 'react-router-dom'

export default function Menu() {
    return (
        <nav className="menu">
            <Link to={{ pathname: "/dashboard/today", state: { prevPath: window.location.pathname } }} state={{ prevPath: window.location.pathname }} className="menu__item"><i className="menu__item-icon bx bx-sun"></i> My Day</Link>
            <Link to={{ pathname: "/dashboard/important", state: { prevPath: window.location.pathname } }} state={{ prevPath: window.location.pathname }} className="menu__item" > <i className="menu__item-icon bx bx-star"></i> Important</Link >
            <Link to={{ pathname: "/dashboard/planned", state: { prevPath: window.location.pathname } }} state={{ prevPath: window.location.pathname }} className="menu__item"><i className="menu__item-icon bx bx-calendar"></i> Planned</Link>
            <Link to={{ pathname: "/dashboard/expireSoon", state: { prevPath: window.location.pathname } }} state={{ prevPath: window.location.pathname }} className="menu__item"><i className="menu__item-icon bx bx-stopwatch"></i> Expired soon</Link>
            <Link to={{ pathname: "/dashboard", state: { prevPath: window.location.pathname } }} state={{ prevPath: window.location.pathname }} className="menu__item"><i className="menu__item-icon bx bx-grid-small"></i> All</Link>
            <hr className="menu__separator" />
            <form className="custom-list-adder">
                <i className="custom-list-adder__icon bx bx-plus"></i>
                <input type="text" className="custom-list-adder__input" placeholder='New list' />
            </form>
        </nav >
    )
}
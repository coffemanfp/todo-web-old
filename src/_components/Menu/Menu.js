import React from 'react'
import './Menu.scss'

export default function Menu() {
    return (
        <nav className="menu">
            <a href="#" className="menu__item"><i className="menu__item-icon bx bx-sun"></i> My Day</a>
            <a href="#" className="menu__item"><i className="menu__item-icon bx bx-star"></i> Important</a>
            <a href="#" className="menu__item"><i className="menu__item-icon bx bx-calendar"></i> Planned</a>
            <a href="#" className="menu__item"><i className="menu__item-icon bx bx-stopwatch"></i> Expired soon</a>
            <a href="#" className="menu__item"><i className="menu__item-icon bx bx-grid-small"></i> All</a>
            <hr className="menu__separator" />
            <form className="custom-list-adder">
                <i className="custom-list-adder__icon bx bx-plus"></i>
                <input type="text" className="custom-list-adder__input" placeholder='New list' />
            </form>
        </nav>
    )
}
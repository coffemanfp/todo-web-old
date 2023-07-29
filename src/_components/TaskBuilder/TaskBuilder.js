import React from 'react'
import './TaskBuilder.scss'

export default function TaskBuilder() {
    return (
        <form className="task-builder">
            <button type="submit" className="task-builder__submit">
                <i className="bx bx-plus"></i>
            </button>
            <input type="text" className="task-builder__input" maxLength={255} autoFocus />
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
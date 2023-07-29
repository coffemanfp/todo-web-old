import React from 'react'
import Task from '../Task/Task'
import './TaskPanel.scss'

export default function TaskPanel() {
    return (
        <div className="task-panel">
            <Task></Task>
            <button className="task-panel__button"><i className="task-panel__button-icon bx bx-sun"></i> Add to my day</button>
            <div className="task-panel__container">
                <button className="task-panel__button"><i className="task-panel__button-icon bx bx-calendar"></i> Add a due date</button>
                <button className="task-panel__button"><i className="task-panel__button-icon bx bx-bell"></i> Remind me</button>
                <button className="task-panel__button"><i className="task-panel__button-icon bx bx-repost"></i> Repeat</button>
            </div>
            <button className="task-panel__button"><i className="task-panel__button-icon bx bx-purchase-tag-alt"></i> Pick a category</button>
            <textarea className="task-panel__description" placeholder='Add a description...'></textarea>
            <footer className="task-panel__footer">
                <button className="task-panel__footer-button task-panel__footer-button--remove"><i className="bx bx-trash"></i></button>
                <br className="task-panel__footer-separator" />
                <button className="task-panel__footer-button"><i className="bx bx-exit"></i></button>
            </footer>
        </div>
    )
}
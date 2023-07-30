import React from 'react'
import './Task.scss'

export default function Task() {
    return (
        <div className="task">
            <button className="task__indicator"><i className="bx bx-circle"></i></button>
            <p className="task__title">Hello! This is a text task.</p>
            <button className="task__important-marker"><i className="bx bx-star"></i></button>
        </div>
    )
}
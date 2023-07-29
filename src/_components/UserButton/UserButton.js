import React from 'react'
import './UserButton.scss'
import avatar from '../../_images/avatar.jpg'

export default function UserButton() {
    return (
        <button className="user-button">
            <img src={avatar} alt="" className="user-button__image" />
        </button>
    )
}
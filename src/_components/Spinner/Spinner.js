import React from 'react'
import './Spinner.scss'

export default function Spinner({ className }) {
    return (
        <span className={"spinner " + className}></span>
    )
}
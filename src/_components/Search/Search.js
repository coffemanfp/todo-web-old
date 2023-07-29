import React from 'react'
import './Search.scss'

export default function Search({ className }) {
    const onSubmit = text => {
        console.log(text)
    }
    return (
        <form className={"search " + className} onSubmit={onSubmit}>
            <button type="submit" className="search__submit"><i className='bx bx-search'></i></button>
            <input type="text" className="search__input" required />
        </form>
    )
}
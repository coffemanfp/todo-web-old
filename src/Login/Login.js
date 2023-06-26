import React from 'react';
import './Login.scss';

export default function Login() {
    return (
        <div className="login">
            <h1 className="login__title">Welcome to the Login!</h1>
            <p className="login__subtitle">I'm glad to see you again!</p>

            <form className="login__form">
                <input placeholder='Email / Nickname' type="text" name="email_or_nickname" id="email_or_nickname" className="login__input" />
                <input placeholder='Password' type="password" name="password" id="password" className="login__input" />
                <a href="#" className="login__link" id="sign-in_issues">Having trouble in sign in?</a>

                <button type="submit" className="login__submit">Sign in</button>
                <p className="login__text">Don't have an account? <a href="#" className="login__link">Register!</a></p>
            </form>
        </div>
    )
}
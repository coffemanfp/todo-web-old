import React, { useEffect } from 'react'
import './Register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../_store/authSlice'

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const errorMessages = {
        "firstName-required": "First name required",
        "firstName-pattern": "First name invalid",
        "lastName-required": "Last name required",
        "lastName-pattern": "Last name invalid",
        "nickname-required": "Nickname required",
        "nickname-pattern": "Nickname invalid",
        "email-required": "Email required",
        "email-pattern": "Email invalid",
        "password-required": "Password required",
        "password-pattern": "Password invalid",
    }
    const errorsHandler = (n, t) => {
        const errorAlertText = errorMessages[`${n}-${t}`]
        return errorAlertText && <p role="alert" className="sign-in-form__input-error">{errorAlertText}</p>
    }
    const onSubmit = user => dispatch(authActions.register(user))
    const registerStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    useEffect(() => {
        if (registerStatus === 'completed') {
            navigate("/dashboard")
        }
    }, [registerStatus])

    return (
        <div className="register">
            <h1 className="register__title">Welcome to the register!</h1>
            <p className="register__subtitle">Who are you?</p>
            <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Nickname' type="text" name="email" id="nickname" className="register__input"
                    {...register("nickname", { required: true, pattern: /^[a-z0-9_-]{3,16}$/i })} />
                {errorsHandler("nickname", errors.nickname?.type)}

                <input placeholder='Email' type="text" name="email" id="email" className="register__input"
                    {...register("email", { required: true, pattern: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/ })} />
                {errorsHandler("email", errors.email?.type)}

                <input placeholder='Password' type="password" name="password" id="password" className="register__input"
                    {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]{8,}$/ })}
                />
                {errorsHandler("password", errors.password?.type)}

                <button type="submit" className="register__submit">Register</button>
                <p className="register__text">Already have an account? <Link to="../login" className="register__link">Login!</Link></p>
            </form>
        </div>
    )
}

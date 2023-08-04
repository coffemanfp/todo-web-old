import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
    return localStorage.getItem('token') ? <Outlet /> : <Navigate to='/login' />
}
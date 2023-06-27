import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App/App'
import Login from './Login/Login'
import Register from './Register/Register'
import {store} from './_store/store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:
    [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      }
    ]
  },
])

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
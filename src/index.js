import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App/App';
import Login from './Login/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:
    [
      {
        path: "/login",
        element: <Login />,
      }
    ]
  },
])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
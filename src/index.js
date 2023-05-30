import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App/App'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { taskReducer } from './taskSlice'
import { categoryReducer } from './categorySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
        category: categoryReducer,
    }
})
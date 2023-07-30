import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createURL, fetchWrapper } from '../_helpers/fetch-wrapper'

const extraActions = createExtraActions()
const slice = createSlice({
    name: "task",
    initialState: createInitialState(),
    extraReducers: createExtraReducers(),
})

function createInitialState() {
    return {
        tasks: [],
        state: 'idle'
    }
}
function createExtraActions() {
    return {
        add: addTask(),
    }

    function addTask() {
        return createAsyncThunk(
            'task/add',
            async task => {
                console.log(Date.now())
                return await fetchWrapper.post(createURL('task'), task)
            }
        )
    }

}
function createExtraReducers() {
    return {
        ...addTask(),
    }

    function addTask() {
        var { pending, fulfilled, rejected } = extraActions.add
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: (state, action) => {
                state.status = 'completed'
            },
            [rejected]: (state, action) => {
                state.status = 'failed'
            }
        }
    }
}

export const taskActions = { ...slice.actions, ...extraActions }
export const taskReducer = slice.task
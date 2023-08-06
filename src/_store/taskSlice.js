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
        task: {},
        status: 'idle'
    }
}

function createExtraActions() {
    return {
        add: addTask(),
        getAll: getAllTask(),
        getOne: getOne(),
        update: updateTask(),
        delete: deleteTask(),
    }

    function addTask() {
        return createAsyncThunk(
            'task/add',
            async task =>
                await fetchWrapper.post(createURL('task'), task)
        )
    }

    function getAllTask() {
        return createAsyncThunk(
            'task/getAll',
            async () =>
                await fetchWrapper.get(createURL('task'))
        )
    }

    function getOne() {
        return createAsyncThunk(
            'task/getOne',
            async id =>
                await fetchWrapper.get(createURL('task/' + id))
        )
    }

    function updateTask() {
        return createAsyncThunk(
            'task/update',
            async task =>
                await fetchWrapper.put(createURL('task' + (task.id ? '/' + task.id : '')), task)
        )
    }
    function deleteTask() {
        return createAsyncThunk(
            'task/delete',
            async id => {
                await fetchWrapper.delete(createURL('task/' + id))
            }
        )
    }
}
function createExtraReducers() {
    return {
        ...addTask(),
        ...getAllTask(),
        ...getOne(),
        ...updateTask(),
        ...deleteTask(),
    }

    function getAllTask() {
        var { pending, fulfilled, rejected } = extraActions.getAll
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: (state, action) => {
                state.status = 'completed'
                state.tasks = action.payload
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }
    function getOne() {
        var { pending, fulfilled, rejected } = extraActions.getOne
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: (state, action) => {
                state.status = 'completed'
                state.task = action.payload
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }

    function addTask() {
        var { pending, fulfilled, rejected } = extraActions.add
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: (state, action) => {
                state.status = 'completed'
                state.tasks.push(action.payload)
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }

    function updateTask() {
        var { pending, fulfilled, rejected } = extraActions.update
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: state => {
                state.status = 'completed'
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }
    function deleteTask() {
        var { pending, fulfilled, rejected } = extraActions.delete
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: state => {
                state.status = 'completed'
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }
}

export const taskActions = { ...slice.actions, ...extraActions }
export const taskReducer = slice.reducer
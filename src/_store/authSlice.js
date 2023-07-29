import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createURL, fetchWrapper } from '../_helpers/fetch-wrapper'

const extraActions = createExtraActions()
const slice = createSlice({
    name: 'auth',
    initialState: createInitialState(),
    reducers: createReducers(),
    // extraReducers(builder) {
    //     builder
    //         .addCase(fetchRegister.pending, state => {
    //             state.status = 'loading'
    //         })
    //         .addCase(fetchRegister.fulfilled, (state, action) => {
    //             state.status = 'complete'
    //             state.token = action.payload.token
    //             localStorage.setItem('token', JSON.stringify(state.token))
    //         })
    //         .addCase(fetchRegister.rejected, (state, action)  => {
    //             state.status = 'failed'
    //             state.error = action.error.message
    //         })
    // }
    extraReducers: createExtraReducers(),
})

function createInitialState() {
    return {
        token: JSON.parse(localStorage.getItem('token')),
        status: 'idle',
        error: null
    }
}

function createReducers() {
    return {
        logout
    }

    function logout(state) {
        state.token = null
        localStorage.removeItem('token')
    }
}

function createExtraActions() {
    return  {
        register: register(),
    }

    function register() {
        return createAsyncThunk(
            'auth/register',
            async (user) => {
                console.log(Date.now())
                return await fetchWrapper.post(createURL('auth/register'), user)
        }
        )
    }
}

function createExtraReducers() {
    return {
        ...register(),
    }

    function register() {
        var { pending, fulfilled, rejected} = extraActions.register
        return {
            [pending]: state => {
                state.error = null
                state.status = 'loading'
            },
            [fulfilled]: (state, action) => {
                const token = action.payload
                state.token = token
                localStorage.setItem('token', JSON.stringify(token))
                state.status = 'completed'
                state.error = null
            },
            [rejected]: (state, action) => {
                state.error = action.error
                state.status = 'failed'
            }
        }
    }
}

export const authActions = { ...slice.actions, ...extraActions }
export const authReducer = slice.reducer
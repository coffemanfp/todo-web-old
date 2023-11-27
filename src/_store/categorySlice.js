import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createURL, fetchWrapper } from '../_helpers/fetch-wrapper'

const extraActions = createExtraActions()
const slice = createSlice({
    name: "category",
    initialState: createInitialState(),
    extraReducers: createExtraReducers(),
})
function createInitialState() {
    return {
        categories: [],
        status: 'idle',
    }
}

function createExtraActions() {
    return {
        getAllCategories: getAllCategories(),
    }

    function getAllCategories() {
        return createAsyncThunk(
            'category/getAll',
            async () =>
                await fetchWrapper.get(createURL('categories'))
        )
    }
}
function createExtraReducers() {
    return {
        ...getAllCategories(),
    }

    function getAllCategories() {
        var { pending, fulfilled, rejected } = extraActions.getAllCategories
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: (state, action) => {
                state.status = 'completed'
                state.categories = action.payload
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }
}

export const categoryActions = { ...slice.actions, ...extraActions }
export const categoryReducer = slice.reducer
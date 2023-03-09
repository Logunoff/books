import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { apiCategoriesUrl } from '../../constants/urls.js';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiCategoriesUrl);

            if (response.status !== 200) {
                throw new Error('Server Error');
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
    axios.interceptors.request.use((config) => {
        const token = Cookies.get('token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config
    }
    )
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: null,
        error: null
    },
    reducers: {
        getCategories(state, action) {
            state.categories.push(action.payload)
        }
    },
    extraReducers: {
        [fetchCategories.pending]: (state) => {
            state.status = 'loading';
            state.error = null
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.categories = action.payload
        },
        [fetchCategories.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        }
    }
});

export const { getCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
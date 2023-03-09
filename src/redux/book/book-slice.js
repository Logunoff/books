import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { apiBookUrl } from '../../constants/urls.js';

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiBookUrl + id);

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

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        book: null,
        status: null,
        error: null
    },
    reducers: {
        getBook(state, action) {
            state.book = [...state.book, action.payload]
        }
    },
    extraReducers: {
        [fetchBook.pending]: (state) => {
            state.status = 'loading';
            state.error = null
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.book = action.payload
        },
        [fetchBook.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        }
    }
});

export const { getBook } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
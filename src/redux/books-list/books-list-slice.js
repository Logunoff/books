import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { apiBooksListUrl } from '../../constants/urls.js';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiBooksListUrl);

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

const bookListSlice = createSlice({
    name: 'books',
    initialState: {
        booksList: [],
        status: null,
        error: null
    },
    reducers: {
        getBooks(state, action) {
            state.booksList.push(action.payload)
        }
    },
    extraReducers: {
        [fetchBooks.pending]: (state) => {
            state.status = 'loading';
            state.error = null
        },
        [fetchBooks.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.booksList = action.payload
        },
        [fetchBooks.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const { getBooks } = bookListSlice.actions;
export const bookListReducer = bookListSlice.reducer;
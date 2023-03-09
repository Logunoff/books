import { combineReducers } from '@reduxjs/toolkit';

import { bookReducer } from './book/book-slice.js';
import { bookListReducer } from './books-list/books-list-slice.js';
import { categoriesReducer } from './categories/categories-slice.js';
import { registrationReducer } from './registration/registration-slice.js';

export const rootReducer = combineReducers({
    bookList: bookListReducer,
    categories: categoriesReducer,
    book: bookReducer,
    registration: registrationReducer
})
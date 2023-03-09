import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Aside } from '../../components/aside/aside.jsx';
import { BlockBooks } from '../../components/block-books/block-books.jsx';
import { Error } from '../../components/error/error.jsx';
import { Loading } from '../../components/loading/loading.jsx';
import { fetchBooks } from '../../redux/books-list/books-list-slice.js';
import { fetchCategories } from '../../redux/categories/categories-slice.js';

import './main-page.css';

export const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchCategories());
    }, [dispatch]);

    const { status, error } = useSelector((state) => state.bookList);
    const statusCategories = useSelector((state) => state.categories.status);
    const errorCategories = useSelector((state) => state.categories.error);
    const categories = useSelector((state) => state.categories.categories);

    return (
        <main>
            <div className='main-page'>
                {status === 'loading' || !status || statusCategories === 'loading' || !statusCategories ? (
                    <Loading />
                ) : error || errorCategories ? (
                    <React.Fragment>
                        <Error />
                        <Aside categories={null} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Aside categories={categories} />
                        <div className='main-page__books'>
                            <BlockBooks />
                        </div>
                    </React.Fragment>
                )}
            </div>
        </main>
    );
};

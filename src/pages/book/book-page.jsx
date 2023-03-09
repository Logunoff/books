import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Aside } from '../../components/aside/aside';
import { BookPageDescription } from '../../components/book-page-description/book-page-description';
import { Error } from '../../components/error/error.jsx';
import { Loading } from '../../components/loading/loading.jsx';
import { useCategoryByPath } from '../../hooks/useCategoryByPath';
import { fetchBook } from '../../redux/book/book-slice';

import './book-page.css';

import 'swiper/css';
import 'swiper/css/pagination';

export const BookPage = () => {
    const dispatch = useDispatch();
    const { genre, id } = useParams();

    const { status, error } = useSelector((state) => state.book);
    const bookCard = useSelector((state) => state.book.book);
    const categories = useSelector((state) => state.categories.categories);

    const getCategory = useCategoryByPath;
    const category = getCategory(genre);

    useEffect(() => {
        dispatch(fetchBook(id));
    }, [dispatch, id]);

    return (
        <main>
            <Aside categories={categories} />
            {status === 'loading' || !status ? (
                <Loading />
            ) : error ? (
                <React.Fragment>
                    <Error />
                    <div className='book-page__path'>
                        <span>{category} книги</span>
                    </div>
                </React.Fragment>
            ) : (
                <BookPageDescription bookCard={bookCard} />
            )}
        </main>
    );
};

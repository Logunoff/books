import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useCategoryByName } from '../../hooks/useCategoryByName.js';
import { useCountBooksInCategory } from '../../hooks/useCountBooksInCategory.js';
import { BooksGrid } from '../books-grid/books-grid.jsx';
import { BooksMenu } from '../books-menu/books-menu.jsx';

import './block-books.css';

export const BlockBooks = () => {
    const { genre } = useParams();

    const [viewBooks, setViewBooks] = useState(true);
    const [searchStr, setSearchStr] = useState('');
    const [rating, setRating] = useState(false);

    const handleSearchStr = (search) => {
        setSearchStr(search);
    };

    const handleSetRating = () => {
        setRating(!rating);
    };

    const categoriesByName = useCategoryByName();
    const valueBooksInCategory = useCountBooksInCategory();

    return (
        <React.Fragment>
            <BooksMenu
                viewBooks={viewBooks}
                setViewBooks={setViewBooks}
                onChange={handleSearchStr}
                onClick={handleSetRating}
                rating={rating}
            />
            {genre === 'all' || Boolean(valueBooksInCategory[categoriesByName[genre]]) ? (
                <BooksGrid viewBooks={viewBooks} rating={rating} searchStr={searchStr} />
            ) : (
                <div className='books__error'>
                    <span data-test-id='empty-category'>В этой категории книг ещё нет</span>
                </div>
            )}
        </React.Fragment>
    );
};

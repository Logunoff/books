import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryByName } from '../../hooks/useCategoryByName.js';
import { BooksList } from '../books-list/books-list.jsx';
import { BooksSquare } from '../books-square/books-square.jsx';

import './books-grid.css';

export const BooksGrid = ({ viewBooks, rating, searchStr }) => {
    const { genre } = useParams();
    const books = useSelector((state) => state.bookList.booksList);

    const categoriesByName = useCategoryByName();

    const searchFilter = books.filter((book) => book.title.toLowerCase().includes(searchStr.toLowerCase()));
    const categoryFilter = searchFilter.filter((book) =>
        genre === 'all' ? true : book.categories.find((category) => category.includes(categoriesByName[genre]))
    );
    const filteredBooks = categoryFilter.sort((nextBook, currBook) => {
        if (rating) return nextBook.rating - currBook.rating;

        return currBook.rating - nextBook.rating;
    });

    if (!categoryFilter.length)
        return (
            <div className='books__error'>
                <span data-test-id='search-result-not-found'>По запросу ничего не найдено</span>
            </div>
        );

    return viewBooks ? (
        <BooksSquare filteredBooks={filteredBooks} searchStr={searchStr} />
    ) : (
        <BooksList filteredBooks={filteredBooks} searchStr={searchStr} />
    );
};

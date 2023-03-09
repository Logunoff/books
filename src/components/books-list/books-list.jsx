import { Link } from 'react-router-dom';

import { useCategoryByName } from '../../hooks/useCategoryByName.js';
import { BookCardList } from '../book-card-list/book-card-list.jsx';

import './books-list.css';

export const BooksList = ({ filteredBooks }) => {
    const categories = useCategoryByName();

    return (
        <div className='books-list'>
            {filteredBooks.map((book) => (
                <Link data-test-id='card' key={book.id} to={`/books/${categories[book.categories]}/${book.id}`}>
                    <BookCardList book={book} key={book.id} />
                </Link>
            ))}
        </div>
    );
};

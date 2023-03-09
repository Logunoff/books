import { Link, useParams } from 'react-router-dom';

import { BookCardSquare } from '../book-card-square/book-card-square.jsx';

import './books-square.css';

export const BooksSquare = ({ filteredBooks, searchStr }) => {
    const { genre } = useParams();

    return (
        <div className='books-square'>
            {filteredBooks.map((book) => (
                <Link data-test-id='card' key={book.id} to={`/books/${genre}/${book.id}`}>
                    <BookCardSquare book={book} key={book.id} searchStr={searchStr} />
                </Link>
            ))}
        </div>
    );
};

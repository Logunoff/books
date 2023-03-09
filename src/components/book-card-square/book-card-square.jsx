import unknownBookImageSmall from '../../assets/images/unknown-book-image-small.svg';
import { hostUrl } from '../../constants/urls';
import { BookTitle } from '../book-title/book-title';

import './book-card-square.css';

export const BookCardSquare = ({ book, searchStr }) => (
    <div className='book-card-square'>
        <div className='book-card-square__div-img'>
            <img src={book.image === null ? unknownBookImageSmall : hostUrl + book.image.url} alt='book-img' />
        </div>
        {book.rating ? (
            <div className='book-card-square__evaluation' />
        ) : (
            <div className='book-card-square__evaluation-empty'>
                <p>еще нет оценок</p>
            </div>
        )}
        <BookTitle searchStr={searchStr} book={book} />
        <p>
            {book.authors}, {book.issueYear}
        </p>
        {book.booking === null ? (
            <button type='button' className='book-card-square__button--active'>
                ЗАБРОНИРОВАТЬ
            </button>
        ) : book.booking.order === true ? (
            <button type='button' className='book-card-square__button--busy'>
                ЗАНЯТА ДО {new Date(book.booking.dateOrder).toLocaleDateString().slice(0, 5)}
            </button>
        ) : (
            <button type='button' className='book-card-square__button--booked'>
                ЗАБРОНИРОВАНА
            </button>
        )}
    </div>
);

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import unknownBookImage from '../../assets/images/unknown-book-image.svg';
import { Review } from '../review/review';
import { Slider } from '../slider/slider';

import './book-page-description.css';

export const BookPageDescription = ({ bookCard }) => {
    const [isHide, setIsHide] = useState(true);
    const { genre } = useParams();

    return (
        <div className='book-page'>
            <div className='book-page__path'>
                <div className='book-page__path-link'>
                    <Link data-test-id='breadcrumbs-link' to={`/books/${genre}`}>
                        <span>{genre === 'all' ? 'Все книги' : bookCard.categories}</span>
                    </Link>
                    <span data-test-id='book-name'>{bookCard.title}</span>
                </div>
            </div>
            <div className='book-page__wrapper'>
                <div className='book-page__book'>
                    <div className='book-page__img-book'>
                        {bookCard.images === null ? (
                            <img src={unknownBookImage} alt='unknownBookImage' />
                        ) : (
                            <Slider imageArr={bookCard.images} />
                        )}
                    </div>
                    <div className='book-page__about-book'>
                        <p data-test-id='book-title'>{bookCard.title}</p>
                        <p>
                            {bookCard.authors}, {bookCard.issueYear}
                        </p>
                        {bookCard.booking === null ? (
                            <button type='button' className='book-card-square__button--active'>
                                ЗАБРОНИРОВАТЬ
                            </button>
                        ) : bookCard.booking.order === true ? (
                            <button type='button' className='book-card-square__button--busy'>
                                ЗАНЯТА ДО {new Date(bookCard.booking.dateOrder).toLocaleDateString().slice(0, 5)}
                            </button>
                        ) : (
                            <button type='button' className='book-card-square__button--booked'>
                                ЗАБРОНИРОВАНА
                            </button>
                        )}
                        <div className='book-page__about'>
                            <p>О книге</p>
                            <p>{bookCard.description}</p>
                        </div>
                    </div>
                </div>
                <div className='book-page__about--mobile'>
                    <p>О книге</p>
                    <p>{bookCard.description}</p>
                </div>
                <div className='book-page__information'>
                    <div className='book-page__rating'>
                        <p>Рейтинг</p>
                        <div className='book-page__seporator' />
                        <p>{bookCard.rating}</p>
                    </div>
                    <div className='book-page__description'>
                        <p>Подробная информация</p>
                        <div className='book-page__seporator' />
                        <div className='book-page__description-wrapper'>
                            <div className='book-page__descripton-first'>
                                <p>
                                    Издательство <span>{bookCard.publish}</span>
                                </p>
                                <p>
                                    Год издания <span>{bookCard.issueYear}</span>
                                </p>
                                <p>
                                    Страниц <span>{bookCard.pages}</span>
                                </p>
                                <p>
                                    Переплёт <span>{bookCard.cover}</span>
                                </p>
                                <p>
                                    Формат <span>{bookCard.format}</span>
                                </p>
                            </div>
                            <div className='book-page__descripton-second'>
                                <p>
                                    Жанр <span>{bookCard.categories}</span>
                                </p>
                                <p>
                                    Вес <span>{bookCard.weight} г.</span>
                                </p>
                                <p>
                                    ISBN <span>{bookCard.ISBN}</span>
                                </p>
                                <p>
                                    Изготовитель <span>{bookCard.producer}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='book-page__review'>
                        <div className='book-page__review-header'>
                            <p>
                                Отзывы{' '}
                                {bookCard.comments === null ? <span>0</span> : <span>{bookCard.comments.length}</span>}
                            </p>
                            <button
                                data-test-id='button-hide-reviews'
                                className={classNames('book-page__review-button', { hide: isHide })}
                                type='button'
                                aria-label='book-page__review-button'
                                onClick={() => setIsHide(!isHide)}
                            />
                        </div>
                        {bookCard.comments === null ? (
                            ''
                        ) : (
                            <div className={classNames('book-page__review-card', { hide: isHide })}>
                                <div className='book-page__seporator' />
                                {bookCard.comments.map((review) => (
                                    <Review review={review} key={review.id} />
                                ))}
                            </div>
                        )}
                        <button data-test-id='button-rating' type='button'>
                            Оценить книгу
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

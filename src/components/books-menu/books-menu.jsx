import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import Search from '../../assets/images/search.svg';

import './books-menu.css';

export const BooksMenu = ({ viewBooks, setViewBooks, onChange, onClick, rating }) => {
    const [focusInput, setFocusInput] = useState(false);
    const focusInputRef = useRef(null);

    const handleFocusInput = (event) => {
        event.preventDefault();
        if (focusInputRef.current && focusInputRef.current.contains(event.target)) {
            setFocusInput(true);
        }
    };

    const filterBooks = (event) => {
        onChange(event.target.value);
    };

    const setRating = (prev) => {
        onClick(!prev);
    };

    useEffect(() => {
        if (focusInput) {
            document.addEventListener('click', handleFocusInput);
        } else {
            document.removeEventListener('click', handleFocusInput);
        }

        return () => {
            document.removeEventListener('click', handleFocusInput);
        };
    });

    const setSquareView = () => {
        setViewBooks(() => true);
    };
    const setListView = () => {
        setViewBooks(() => false);
    };

    return (
        <div className='books__menu'>
            <button
                data-test-id='button-search-open'
                className={classNames('books__search-button-open', { focus: focusInput })}
                ref={focusInputRef}
                onClick={handleFocusInput}
                aria-label='books__search-button'
                type='button'
            />
            <div className={classNames('books__input-search', { focus: focusInput })}>
                <input
                    data-test-id='input-search'
                    aria-label='books__search'
                    type='text'
                    placeholder='Поиск книги или автора…'
                    className={classNames('books__search-input', { focus: focusInput })}
                    onChange={filterBooks}
                />
                <img src={Search} alt='input-search' />
            </div>
            <button
                className={classNames('books__search-rating', { rating })}
                aria-label='books__search-rating'
                type='button'
                onClick={setRating}
                data-test-id='sort-rating-button'
            >
                <span>По рейтингу</span>
            </button>
            <button
                data-test-id='button-search-close'
                type='button'
                className={classNames('books__search-input-button', { focus: focusInput })}
                onClick={() => setFocusInput(false)}
            >
                <div />
                <div />
            </button>
            <div
                className={classNames(viewBooks ? 'books__view-square-active' : 'books__view-list-active', {
                    focus: focusInput,
                })}
            >
                {viewBooks ? (
                    <React.Fragment>
                        <button
                            data-test-id='button-menu-view-window'
                            onClick={setSquareView}
                            aria-label='books__view-square-active'
                            type='button'
                        />
                        <button
                            data-test-id='button-menu-view-list'
                            onClick={setListView}
                            aria-label='books__view-list-disable'
                            type='button'
                        />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <button
                            data-test-id='button-menu-view-window'
                            onClick={setSquareView}
                            aria-label='books__view-square-disable'
                            type='button'
                        />
                        <button
                            data-test-id='button-menu-view-list'
                            onClick={setListView}
                            aria-label='books__view-list-active'
                            type='button'
                        />
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

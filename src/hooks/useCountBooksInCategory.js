import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const countBooksInCategories = (books) =>
    books.reduce((result, { categories }) => {
        if (!categories.length) return result;

        categories.forEach((category) => {
            if (category in result) result[category] += 1;
            else result[category] = 1;
        });

        return result;
    }, {});

export const useCountBooksInCategory = () => {
    const books = useSelector((state) => state.bookList.booksList);
    const countedCategories = useMemo(() => countBooksInCategories(books), [books]);

    return countedCategories;
};

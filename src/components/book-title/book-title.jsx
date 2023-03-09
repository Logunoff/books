import './book-title.css';

export const BookTitle = ({ searchStr, book }) => {
    const paintStr = (string, filter) =>
        string.replace(
            new RegExp(`(${filter})`, 'gi'),
            "<span data-test-id='highlight-matches' class='paint-filter'>$1</span>"
        );

    return searchStr ? (
        <p dangerouslySetInnerHTML={{ __html: paintStr(book.title, searchStr) }} />
    ) : (
        <p className='book-title'>{book.title}</p>
    );
};

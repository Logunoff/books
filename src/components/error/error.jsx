import './error.css';

export const Error = () => (
    <div className='error' data-test-id='error'>
        <p>Что-то пошло не так. Обновите страницу через некоторое время.</p>
        <button aria-label='close' type='button' />
    </div>
);

import classNames from 'classnames';

import './form-warning.css';

export const FormWarning = ({ status, action }) => (
    <div className={classNames('form-warning', { 'server-error': Boolean(status) })}>
        <h4>{status.title}</h4>
        <p>{status.info}</p>
        <button className='auth__button--submit' type='submit' onClick={action}>
            {status.buttonText}
        </button>
    </div>
);

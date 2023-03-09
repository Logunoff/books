import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';

import '../../assets/styles/auth-layout.css';

export const RegistrationStep3 = ({ onSubmitForm }) => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = (data) => {
        onSubmitForm({ ...data });
    };

    return (
        <form className='auth-layout__form' action='' onSubmit={handleSubmit(onSubmit)}>
            <h4 className='registration__title'>Регистрация</h4>
            <h5>3 шаг из 3</h5>
            <div className='registration__input'>
                <input
                    type='tel'
                    mask={[
                        '+',
                        '3',
                        '7',
                        '5',
                        ' ',
                        '(',
                        /\d/,
                        /\d/,
                        ')',
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        '-',
                        /\d/,
                        /\d/,
                        '-',
                        /\d/,
                        /\d/,
                    ]}
                    {...register('phone', {
                        required: 'В формате +375 (xx) xxx-xx-xx',
                    })}
                />
                <span className='registration__placeholder'>Номер телефона</span>
            </div>
            <div className='registration__input registration__input-password'>
                <input
                    type='email'
                    {...register('email', {
                        required: 'Введите корректный e-mail',
                        pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    })}
                />
                <span className='registration__placeholder'>E-mail</span>
            </div>
            <button className='registration__button' type='submit' disabled={!isValid}>
                ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
            <div className='registration__registration'>
                <span>Есть учётная запись?</span>
                <NavLink to='/auth'>
                    Войти
                    <img src={arrow} alt='arrow' />
                </NavLink>
            </div>
        </form>
    );
};

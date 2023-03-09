import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';
import { setRegistration } from '../../redux/registration/registration-slice';

import '../../assets/styles/auth-layout.css';

export const RegistrationStep1 = ({ onClick }) => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    });

    const handleStep = () => onClick();

    const onSubmit = (data) => {
        console.log(data);
        handleStep();
        dispatch(setRegistration(data));
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <form className='auth-layout__form' action='' onSubmit={handleSubmit(onSubmit)}>
            <h4 className='registration__title'>Регистрация</h4>
            <h5>1 шаг из 3</h5>
            <div className='registration__input'>
                <input
                    required={true}
                    {...register('username', {
                        required: 'Поле не может быть пустым',
                        pattern: /^[A-Za-z0-9]+$/,
                    })}
                />
                <span className='registration__placeholder'>Придумайте логин для входа</span>
                <span className='registration__hint'>Используйте для логина латинский алфавит и цифры</span>
            </div>
            <div className='registration__input registration__input-password'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    required={true}
                    {...register('password', {
                        required: 'Поле не может быть пустым',
                        minLength: {
                            value: 8,
                            message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                        },
                        pattern: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    })}
                />
                <span className='registration__placeholder'>Пароль</span>
                <span className='registration__hint'>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
                <button
                    aria-label='auth__show-password'
                    type='button'
                    className={classNames('auth__button--show-password', { show: showPassword })}
                    onClick={handleShowPassword}
                />
            </div>
            <button className='registration__button' type='submit' disabled={!isValid}>
                СЛЕДУЮЩИЙ ШАГ
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

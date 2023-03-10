import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';
import greenMark from '../../assets/images/green-mark.svg';
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
        mode: 'all',
    });

    const handleStep = () => onClick();

    const onSubmit = (data) => {
        console.log(data);
        handleStep();
        dispatch(setRegistration(data));
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <form data-test-id='register-form' className='auth-layout__form' action='' onSubmit={handleSubmit(onSubmit)}>
            <h4 className='registration__title'>Регистрация</h4>
            <h5>1 шаг из 3</h5>
            <div className='registration__input'>
                <input
                    name='username'
                    required={true}
                    className={errors?.username ? 'auth__input-error' : 'auth__input'}
                    {...register('username', {
                        required: 'Поле не может быть пустым',
                        pattern: {
                            value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
                            message: 'Используйте для логина латинский алфавит и цифры',
                        },
                    })}
                />
                <span className='registration__placeholder'>Придумайте логин для входа</span>
                <div className='auth__div-error'>
                    {errors?.username ? (
                        <span data-test-id='hint' className='auth__error'>
                            {errors?.username?.message}
                        </span>
                    ) : (
                        <span data-test-id='hint' className='registration__hint'>
                            Используйте для логина латинский алфавит и цифры
                        </span>
                    )}
                </div>
            </div>
            <div className='registration__input registration__input-password'>
                <input
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    required={true}
                    className={errors?.password ? 'auth__input-error' : 'auth__input'}
                    {...register('password', {
                        required: 'Поле не может быть пустым',
                        minLength: {
                            value: 8,
                            message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                        },
                        pattern: {
                            value: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                            message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                        },
                    })}
                />
                <span className='registration__placeholder'>Пароль</span>
                <div className='auth__div-error'>
                    {errors?.password ? (
                        <span data-test-id='hint' className='auth__error'>
                            {errors?.password?.message}
                        </span>
                    ) : (
                        <span data-test-id='hint' className='registration__hint'>
                            Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </span>
                    )}
                </div>
                {errors?.password && (
                    <img
                        data-test-id='checkmark'
                        className={errors?.password ? 'registration__green-mark-hide' : 'registration__green-mark-show'}
                        src={greenMark}
                        alt='green-mark'
                    />
                )}
                <button
                    data-test-id={showPassword ? 'eye-opened' : 'eye-closed'}
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

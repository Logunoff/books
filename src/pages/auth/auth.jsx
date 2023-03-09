import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';
import { FormWarning } from '../../components/form-warning/form-warning';
import { STATUS_AUTH } from '../../constants/responce-status';
import { useAuthRequest } from '../../hooks/useAuthRequest';

import './auth.css';

export const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);

    const { authRequest, isLoading, errorStatus } = useAuthRequest();

    const showStatus = STATUS_AUTH[errorStatus];

    useEffect(() => {
        if (errorStatus === 400) {
            setErrorAuth(true);
        }
    }, [errorStatus]);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = (data) => authRequest(data);
    const handleShowPassword = () => setShowPassword(!showPassword);

    console.log(errors);

    return (
        <div className='auth-layout'>
            <h3>Cleverland</h3>
            <form action='' onSubmit={handleSubmit(onSubmit)}>
                <div className={classNames('auth-layout__form', { 'server-error': !!showStatus })}>
                    <h4 className='auth-layout__title'>Вход в личный кабинет</h4>
                    <div className='auth__div-input'>
                        <input
                            className={errors?.identifier || errorAuth ? 'auth__input-error' : 'auth__input'}
                            {...register('identifier', {
                                required: 'Неверный логин или пароль!',
                            })}
                        />
                        <span className='auth__placeholder'>Логин</span>
                    </div>
                    <div className='auth__div-input auth__input-password'>
                        <input
                            className={errors?.password || errorAuth ? 'auth__input-error' : 'auth__input'}
                            type={showPassword ? 'text' : 'password'}
                            required={true}
                            {...register('password', {
                                required: 'Неверный логин или пароль!',
                            })}
                        />
                        <button
                            aria-label='auth__show-password'
                            type='button'
                            className={classNames('auth__button--show-password', { show: showPassword })}
                            onClick={handleShowPassword}
                        />
                        <span className='auth__placeholder'>Пароль</span>
                    </div>
                    <div>
                        {errors?.identifier ? (
                            <React.Fragment>
                                <p className='auth__error'>{errors?.identifier.message || errors?.password.message}</p>
                                <Link to='/forgot-pass'>
                                    <p className='auth__forgot-password'>Восстановить?</p>
                                </Link>
                            </React.Fragment>
                        ) : (
                            <Link to='/forgot-pass'>
                                <p className='auth__forgot-password'>Забыли логин или пароль?</p>
                            </Link>
                        )}
                    </div>
                    <button className='auth__button--submit' type='submit'>
                        ВХОД
                    </button>
                    <div className='auth__registration'>
                        <span>Нет учётной записи?</span>
                        <Link to='/registration'>
                            Регистрация
                            <img src={arrow} alt='arrow' />
                        </Link>
                    </div>
                </div>
                {showStatus && <FormWarning status={showStatus} />}
            </form>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import arrow from '../../assets/images/arrow-reg.svg';
import { FormWarning } from '../../components/form-warning/form-warning';
import { Loading } from '../../components/loading/loading.jsx';
import { STATUS_AUTH } from '../../constants/responce-status';
import { useAuthRequest } from '../../hooks/useAuthRequest';

import './auth.css';

export const Auth = () => {
    const navigate = useNavigate();
    const user = Cookies.get('token');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const [showPassword, setShowPassword] = useState(false);
    const [showButtonPassword, setShowButtonPassword] = useState(false);

    const { authRequest, isLoading, errorStatus } = useAuthRequest();

    const isAuthError = errorStatus === 400;
    const isShowModal = Boolean(errorStatus) && errorStatus !== 400;

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => authRequest(data);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const passFocus = () => setShowButtonPassword(true);

    return (
        <div data-test-id='auth' className='auth-layout'>
            {isLoading ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <h3>Cleverland</h3>
                    <form data-test-id='auth-form' action='' onSubmit={handleSubmit(onSubmit)}>
                        {isShowModal ? (
                            <FormWarning status={STATUS_AUTH.default} />
                        ) : (
                            <div className={classNames('auth-layout__form')}>
                                <h4 className='auth-layout__title'>Bход в личный кабинет</h4>
                                <div className='auth__div-input'>
                                    <input
                                        name='identifier'
                                        required={true}
                                        className={
                                            errors?.identifier || isAuthError ? 'auth__input-error' : 'auth__input'
                                        }
                                        {...register('identifier', {
                                            required: 'Поле не может быть пустым',
                                        })}
                                    />
                                    <span className='auth__placeholder'>Логин</span>
                                    <div className='auth__div-error'>
                                        {errors?.identifier && (
                                            <span data-test-id='hint' className='auth__error'>
                                                {errors?.identifier?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className='auth__div-input auth__input-password'>
                                    <input
                                        name='password'
                                        onFocus={passFocus}
                                        className={
                                            errors?.password || isAuthError ? 'auth__input-error' : 'auth__input'
                                        }
                                        type={showPassword ? 'text' : 'password'}
                                        required={true}
                                        {...register('password', {
                                            required: 'Поле не может быть пустым',
                                        })}
                                    />
                                    <span className='auth__placeholder'>Пароль</span>
                                    <div className='auth__div-error'>
                                        {errors?.password && (
                                            <span data-test-id='hint' className='auth__error'>
                                                {errors?.password?.message}
                                            </span>
                                        )}
                                    </div>
                                    {showButtonPassword && (
                                        <button
                                            aria-label='auth__show-password'
                                            type='button'
                                            data-test-id={showPassword ? 'eye-opened' : 'eye-closed'}
                                            className={classNames('auth__button--show-password', {
                                                show: !showPassword,
                                            })}
                                            onClick={handleShowPassword}
                                        />
                                    )}
                                </div>
                                <div>
                                    {isAuthError ? (
                                        <React.Fragment>
                                            <span data-test-id='hint' className='auth__error'>
                                                Неверный логин или пароль!
                                            </span>
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
                                <button className='auth__button--submit' type='submit' disabled={isLoading}>
                                    {isLoading ? 'загрузка' : 'вход'}
                                </button>
                                <div className='auth__registration'>
                                    <span>Нет учётной записи?</span>
                                    <Link to='/registration'>
                                        Регистрация
                                        <img src={arrow} alt='arrow' />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </form>
                </React.Fragment>
            )}
        </div>
    );
};

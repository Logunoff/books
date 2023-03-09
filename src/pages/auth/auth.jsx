import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';
import { FormWarning } from '../../components/form-warning/form-warning';
import { Loading } from '../../components/loading/loading.jsx';
import { STATUS_AUTH } from '../../constants/responce-status';
import { useAuthRequest } from '../../hooks/useAuthRequest';

import './auth.css';

export const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { authRequest, isLoading, errorStatus } = useAuthRequest();

    const isAuthError = errorStatus === 400;
    const isShowModal = Boolean(errorStatus) && errorStatus !== 400;

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = (data) => authRequest(data);
    const handleShowPassword = () => setShowPassword(!showPassword);

    return isLoading ? (
        <Loading />
    ) : (
        <div className='auth-layout'>
            <h3>Cleverland</h3>
            <form action='' onSubmit={handleSubmit(onSubmit)}>
                {isShowModal ? (
                    <FormWarning status={STATUS_AUTH.default} />
                ) : (
                    <div className={classNames('auth-layout__form')}>
                        <h4 className='auth-layout__title'>Вход в личный кабинет</h4>
                        <div className='auth__div-input'>
                            <input
                                required={true}
                                className={errors?.identifier || isAuthError ? 'auth__input-error' : 'auth__input'}
                                {...register('identifier', {
                                    required: 'Поле не может быть пустым',
                                })}
                            />
                            <span className='auth__placeholder'>Логин</span>
                        </div>
                        <div className='auth__div-input auth__input-password'>
                            <input
                                className={errors?.password || isAuthError ? 'auth__input-error' : 'auth__input'}
                                type={showPassword ? 'text' : 'password'}
                                required={true}
                                {...register('password', {
                                    required: 'Поле не может быть пустым',
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
                            {isAuthError ? (
                                <React.Fragment>
                                    <p className='auth__error'>Не верный логин или пароль!</p>
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
                            {isLoading ? 'ЗАГРУЗКА' : 'ВХОД'}
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
        </div>
    );
};

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';

import arrowAuth from '../../assets/images/arrow-forget.svg';
import arrowReg from '../../assets/images/arrow-reg.svg';
import { apiForgotPassword } from '../../constants/urls';

import '../../assets/styles/auth-layout.css';
import '../../pages/forgot-password/forgot-password.css';

export const ForgotPass = () => {
    const [showStatus, setShowStatus] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        console.log(data);
        axios
            .post(apiForgotPassword, { ...data })
            .then((response) => {
                console.log(response);
                if (response.data.ok) {
                    setShowStatus(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form action='' onSubmit={handleSubmit(onSubmit)}>
            <div className={classNames('forgot-pass-layout__form', { 'server-response': showStatus })}>
                <div className='forgot-pass__auth'>
                    <Link to='/auth'>
                        <img src={arrowAuth} alt='arrowAuth' />
                        <span>ВХОД В ЛИЧНЫЙ КАБИНЕТ</span>
                    </Link>
                </div>
                <div className='forgot-pass__form'>
                    <div className='forgot-pass__div-input'>
                        <h4 className='forgot-pass__title'>Восстановление пароля</h4>
                        <input
                            className={errors?.email ? 'forgot-pass__input-error' : 'forgot-pass__input'}
                            {...register('email', {
                                required: 'Введите корректный e-mail',
                                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                            })}
                        />
                        <span className='forgot-pass__placeholder'>Email</span>
                        {errors?.email && <p className='forgot-pass__error'>{errors.email.message}</p>}
                        <p className='forgot-pass__hint'>
                            На это email будет отправлено письмо с инструкциями по восстановлению пароля
                        </p>
                    </div>
                    <button className='forgot-pass__button--submit' type='submit'>
                        ВОССТАНОВИТЬ
                    </button>
                    <div className='forgot-pass__registration'>
                        <span>Нет учётной записи?</span>
                        <Link to='/registration'>
                            РЕГИСТРАЦИЯ
                            <img src={arrowReg} alt='arrowReg' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={classNames('form-warning', { 'server-error': showStatus })}>
                <h4>Письмо выслано</h4>
                <p>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</p>
            </div>
        </form>
    );
};

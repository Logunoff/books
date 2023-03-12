import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';

import arrowAuth from '../../assets/images/arrow-forget.svg';
import arrowReg from '../../assets/images/arrow-reg.svg';
import { FORGOT_PASSWORD } from '../../constants/responce-status';
import { apiForgotPassword } from '../../constants/urls';
import { FormWarning } from '../form-warning/form-warning';
import { Loading } from '../loading/loading.jsx';

import '../../assets/styles/auth-layout.css';
import '../../pages/forgot-password/forgot-password.css';

export const ForgotPass = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [serverError, setServerError] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        setIsLoading(true);

        axios
            .post(apiForgotPassword, { ...data })
            .then((response) => {
                if (response.data.ok) {
                    setShowStatus(true);
                }
            })
            .catch((error) => {
                if (error.response.status) {
                    setServerError(true);
                }
            })
            .finally(() => setIsLoading(false));
    };

    return showStatus ? (
        <FormWarning status={FORGOT_PASSWORD[200]} />
    ) : isLoading ? (
        <Loading />
    ) : (
        <form data-test-id='send-email-form' action='' onSubmit={handleSubmit(onSubmit)}>
            <div className='forgot-pass-layout__form'>
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
                            name='email'
                            className={errors?.email ? 'forgot-pass__input-error' : 'forgot-pass__input'}
                            required={true}
                            {...register('email', {
                                required: 'Поле не может быть пустым',
                                pattern: {
                                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                    message: 'Введите корректный e-mail',
                                },
                            })}
                        />
                        <span className='forgot-pass__placeholder'>Email</span>
                        {errors?.email && (
                            <span data-test-id='hint' className='forgot-pass__error'>
                                {errors?.email.message}
                            </span>
                        )}
                        {serverError && (
                            <span data-test-id='hint' className='forgot-pass__error'>
                                error
                            </span>
                        )}
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
        </form>
    );
};

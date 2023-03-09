import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import classNames from 'classnames';

import { STATUS_RESET_PASSWORD } from '../../constants/responce-status';
import { apiResetPassword } from '../../constants/urls';
import { FormWarning } from '../form-warning/form-warning';

import '../../assets/styles/auth-layout.css';
import '../../pages/forgot-password/forgot-password.css';
import './reset-pass.css';

export const ResetPass = ({ code }) => {
    // const [showStatus, setShowStatus] = useState(false);
    const [forgotPassStatus, setforgotPassStatus] = useState(null);

    // const handleStatusFormClick = {
    //     if(forgotPassStatus)
    // };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'all',
    });

    console.log(forgotPassStatus);

    const onSubmit = (data) => {
        axios
            .post(apiResetPassword, { ...code, ...data })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    setforgotPassStatus(STATUS_RESET_PASSWORD[200]);
                }

                return null;
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setforgotPassStatus(STATUS_RESET_PASSWORD[400]);
                }
            });
    };

    return (
        <form action='' onSubmit={handleSubmit(onSubmit)}>
            <div className={classNames('reset-pass-layout__form', { 'server-response': !!forgotPassStatus })}>
                <div className='reset-pass__form'>
                    <div className='reset-pass__div-input'>
                        <h4 className='reset-pass__title'>Восстановление пароля</h4>
                        <input
                            type='text'
                            className={errors?.password ? 'forgot-pass__input-error' : 'forgot-pass__input'}
                            {...register('password', {
                                required: 'Введите корректный e-mail',
                                pattern: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                            })}
                        />
                        <span className='reset-pass__placeholder'>Новый пароль</span>
                        {/* {errors?.password && <p className='forgot-pass__error'>{errors.email.message}</p>} */}
                        <p className='forgot-pass__hint'>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
                    </div>
                    <div className='reset-pass-conf__div-input'>
                        <input
                            type='text'
                            className={errors?.passwordConfirmation ? 'forgot-pass__input-error' : 'forgot-pass__input'}
                            {...register('passwordConfirmation', {
                                required: 'Введите корректный e-mail',
                                pattern: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                            })}
                        />
                        <span className='reset-pass-conf__placeholder'>Повторите пароль</span>
                        {/* {errors?.passwordConfirmation && <p className='forgot-pass__error'>{errors.email.message}</p>} */}
                    </div>
                    <button className='forgot-pass__button--submit' type='submit'>
                        СОХРАНИТЬ ИЗМЕНЕНИЯ
                    </button>
                    <p className='reset-pass__info'>После сохранения войдите в библиотеку, используя новый пароль</p>
                </div>
            </div>
            {forgotPassStatus && <FormWarning forgotPassStatus={forgotPassStatus} />}
        </form>
    );
};

import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import MaskedInput from 'react-text-mask';

import arrow from '../../assets/images/arrow-reg.svg';

import { PHONE_MASK, phoneValidateRules } from './validate';

import '../../assets/styles/auth-layout.css';

export const RegistrationStep3 = ({ onSubmitForm }) => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        control,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = (data) => {
        onSubmitForm({ ...data });
    };

    return (
        <form data-test-id='register-form' className='auth-layout__form' action='' onSubmit={handleSubmit(onSubmit)}>
            <h4 className='registration__title'>Регистрация</h4>
            <h5>3 шаг из 3</h5>
            <div className='registration__input'>
                <Controller
                    type='tel'
                    name='phone'
                    rules={phoneValidateRules}
                    control={control}
                    render={({ field }) => (
                        <MaskedInput
                            className={errors?.phone ? 'auth__input-error' : 'auth__input'}
                            mask={PHONE_MASK}
                            placeholderChar='x'
                            {...field}
                        />
                    )}
                    {...register('phone', {
                        required: 'Поле не может быть пустым',
                    })}
                />
                <span className='registration__placeholder'>Номер телефона</span>
                {errors?.phone ? (
                    <span data-test-id='hint' className='auth__error'>
                        {errors?.phone?.message}
                    </span>
                ) : (
                    <span data-test-id='hint' className='registration__hint'>
                        В формате +375 (xx) xxx-xx-xx
                    </span>
                )}
            </div>
            <div className='registration__input registration__input-password'>
                <input
                    name='email'
                    type='email'
                    className={errors?.email ? 'auth__input-error' : 'auth__input'}
                    required={true}
                    {...register('email', {
                        required: 'Поле не может быть пустым',
                        pattern: { value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: 'Введите корректный e-mail' },
                    })}
                />
                <span className='registration__placeholder'>E-mail</span>
                {errors?.email && (
                    <span data-test-id='hint' className='auth__error'>
                        {errors?.email.message}
                    </span>
                )}
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

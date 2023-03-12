import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import arrow from '../../assets/images/arrow-reg.svg';
import { setRegistration } from '../../redux/registration/registration-slice';

import '../../assets/styles/auth-layout.css';

export const RegistrationStep2 = ({ onClick }) => {
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: 'all',
    });
    const handleStep = () => onClick();

    const onSubmit = (data) => {
        handleStep();
        dispatch(setRegistration(data));
    };

    return (
        <form data-test-id='register-form' className='auth-layout__form' action='' onSubmit={handleSubmit(onSubmit)}>
            <h4 className='registration__title'>Регистрация</h4>
            <h5>2 шаг из 3</h5>
            <div className='registration__input'>
                <input
                    name='firstName'
                    className={errors?.firstName ? 'auth__input-error' : 'auth__input'}
                    required={true}
                    {...register('firstName', {
                        required: 'Поле не может быть пустым',
                    })}
                />
                <span className='registration__placeholder'>Имя</span>
                {errors?.firstName && (
                    <span data-test-id='hint' className='auth__error'>
                        {errors?.firstName?.message}
                    </span>
                )}
            </div>
            <div className='registration__input registration__input-password'>
                <input
                    name='lastName'
                    className={errors?.lastName ? 'auth__input-error' : 'auth__input'}
                    required={true}
                    {...register('lastName', {
                        required: 'Поле не может быть пустым',
                    })}
                />
                <span className='registration__placeholder'>Фамилия</span>
                {errors?.lastName && (
                    <span data-test-id='hint' className='auth__error'>
                        {errors?.lastName?.message}
                    </span>
                )}
            </div>
            <button className='registration__button' type='submit' disabled={!isValid}>
                ПОСЛЕДНИЙ ШАГ
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

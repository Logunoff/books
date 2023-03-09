import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

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
        mode: 'onBlur',
    });
    const handleStep = () => onClick();

    const onSubmit = (data) => {
        console.log(data);
        handleStep();
        dispatch(setRegistration(data));
    };

    return (
        <form className='auth-layout__form' action='' onSubmit={handleSubmit(onSubmit)}>
            <h4 className='registration__title'>Регистрация</h4>
            <h5>2 шаг из 3</h5>
            <div className='registration__input'>
                <input
                    {...register('firstName', {
                        required: 'Поле не может быть пустым',
                    })}
                />
                <span className='registration__placeholder'>Имя</span>
            </div>
            <div className='registration__input registration__input-password'>
                <input
                    {...register('lastName', {
                        required: 'Поле не может быть пустым',
                    })}
                />
                <span className='registration__placeholder'>Фамилия</span>
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

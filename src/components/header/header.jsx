import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import cleverland from '../../assets/images/cleverland.svg';
import logo from '../../assets/images/logo-clevertec_40.svg';

import './header.css';

export const Header = ({ isShow, setIsShow }) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const showMenu = (e) => {
        e.stopPropagation();
        setIsShow(!isShow);
        e.preventDefault();
    };

    const logout = () => {
        Cookies.remove('token');
        navigate('/auth');
    };

    return (
        <header className={classNames('header', { show: showUserMenu })}>
            <div className='header__wrapper'>
                <div className='header__logo'>
                    <Link to='/'>
                        <img src={logo} alt='logo' />
                        <img src={cleverland} alt='cleverland' />
                    </Link>
                </div>
                <button data-test-id='button-burger' type='button' aria-label='header__btn-menu' onClick={showMenu}>
                    <div type='button' className={classNames('header__btn-menu', { cross: isShow })}>
                        <div />
                        <div />
                        <div />
                    </div>
                </button>
                <p>Библиотека</p>
                <div className='header__user'>
                    <p>Привет, Иван!</p>
                    <button
                        className='header__btn-user'
                        aria-label='avatar'
                        type='button'
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    />
                    <div className={classNames('header__user-menu', { show: showUserMenu })}>
                        <Link>Профиль</Link>
                        <button type='button' className='header__user-logout' onClick={logout}>
                            Выход
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

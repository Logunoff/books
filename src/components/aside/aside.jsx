import { useEffect, useState } from 'react';
import { NavLink, useLocation, useOutletContext } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import { useCountBooksInCategory } from '../../hooks/useCountBooksInCategory';

import './aside.css';

export const Aside = ({ categories }) => {
    const [isHide, setIsHide] = useState(true);
    const [ref, isShow, setIsShow] = useOutletContext();
    const burgerWigth = window.innerWidth > 768;
    const { pathname } = useLocation();

    const valueBooksInCategory = useCountBooksInCategory();

    useEffect(() => {
        setIsHide(!['/rules', '/terms'].includes(pathname));
    }, [pathname]);

    const logout = () => {
        Cookies.remove('token');
    };

    return (
        <aside data-test-id='burger-navigation' ref={ref} className={classNames('aside', { hide: !isShow })}>
            <h5>
                <NavLink
                    data-test-id={burgerWigth ? 'navigation-showcase' : 'burger-showcase'}
                    to='/books/all'
                    className={classNames('aside__button', { hide: !isHide })}
                    onClick={() => setIsHide(!isHide)}
                >
                    Витрина книг
                </NavLink>
                <div className={classNames('aside-wrapper', { hide: !isHide })}>
                    <NavLink
                        data-test-id={burgerWigth ? 'navigation-books' : 'burger-books'}
                        to='/books/all'
                        onClick={() => setIsShow(!isShow)}
                    >
                        Все книги
                    </NavLink>
                    {categories === null
                        ? ''
                        : categories.map((category) => (
                              <div key={category.id}>
                                  <NavLink
                                      data-test-id={
                                          burgerWigth ? `navigation-${category.path}` : `burger-${category.path}`
                                      }
                                      to={`/books/${category.path}`}
                                      onClick={() => setIsShow(!isShow)}
                                  >
                                      {category.name}
                                  </NavLink>
                                  {valueBooksInCategory[category.name] ? (
                                      <span
                                          data-test-id={`${burgerWigth ? 'navigation' : 'burger'}-book-count-for-${
                                              category.path
                                          }`}
                                      >
                                          {valueBooksInCategory[category.name]}
                                      </span>
                                  ) : (
                                      <span
                                          data-test-id={`${burgerWigth ? 'navigation' : 'burger'}-book-count-for-${
                                              category.path
                                          }`}
                                      >
                                          0
                                      </span>
                                  )}
                              </div>
                          ))}
                </div>
            </h5>
            <h5>
                <NavLink data-test-id={burgerWigth ? 'navigation-terms' : 'burger-terms'} to='/rules'>
                    Правила пользования
                </NavLink>
            </h5>
            <h5>
                <NavLink data-test-id={burgerWigth ? 'navigation-contract' : 'burger-contract'} to='/terms'>
                    Договор оферты
                </NavLink>
            </h5>
            <div className='aside__user'>
                <div className='aside__seporator' />
                <h5>
                    <NavLink to='/profile'>Профиль</NavLink>
                </h5>
                <h5>
                    <NavLink onClick={logout} to='/auth'>
                        Выход
                    </NavLink>
                </h5>
            </div>
        </aside>
    );
};

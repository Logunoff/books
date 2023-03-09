import React from 'react';
import { Outlet } from 'react-router-dom';

import { useOutside } from '../../hooks/useOutside';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import './layout.css';

export const Layout = () => {
    const { ref, isShow, setIsShow } = useOutside(false);

    return (
        <React.Fragment>
            <Header isShow={isShow} setIsShow={setIsShow} />
            <Outlet context={[ref, isShow, setIsShow]} />
            <Footer />
        </React.Fragment>
    );
};

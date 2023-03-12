import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { ForgotPass } from '../../components/forgot-pass/forgot-pass';
import { ResetPass } from '../../components/reset-pass/reset-pass';

import '../../assets/styles/auth-layout.css';
import './forgot-password.css';

export const ForgotPassword = () => {
    const [searchParams] = useSearchParams();
    const code = { code: searchParams.get('code') };
    const isCode = searchParams.has('code');

    const navigate = useNavigate();
    const user = Cookies.get('token');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div data-test-id='auth' className='auth-layout'>
            <h3>Cleverland</h3>
            {isCode ? <ResetPass code={code} /> : <ForgotPass />}
        </div>
    );
};

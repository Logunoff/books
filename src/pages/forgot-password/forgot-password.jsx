import { useSearchParams } from 'react-router-dom';

import { ForgotPass } from '../../components/forgot-pass/forgot-pass';
import { ResetPass } from '../../components/reset-pass/reset-pass';

import '../../assets/styles/auth-layout.css';
import './forgot-password.css';

export const ForgotPassword = () => {
    const [searchParams] = useSearchParams();
    const code = { code: searchParams.get('code') };
    const isCode = searchParams.has('code');

    return (
        <div className='auth-layout'>
            <h3>Cleverland</h3>
            {isCode ? <ResetPass code={code} /> : <ForgotPass />}
        </div>
    );
};

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { FormWarning } from '../../components/form-warning/form-warning';
import { Loading } from '../../components/loading/loading.jsx';
import { RegistrationStep1 } from '../../components/registration-step-1/registration-step-1';
import { RegistrationStep2 } from '../../components/registration-step-2/registration-step-2';
import { RegistrationStep3 } from '../../components/registration-step-3/registration-step-3';
import { STATUS_REGISTRATION } from '../../constants/responce-status';
import { useRegistrationRequest } from '../../hooks/useRegistrationRequest';

import './registration.css';

export const Registration = () => {
    const navigate = useNavigate();
    const user = Cookies.get('token');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const [step, setStep] = useState(1);
    const [localData, setLocalData] = useState(null);
    const handleStep = () => {
        setStep(step + 1);
    };

    const { regRequest, isLoading, responseStatus } = useRegistrationRequest();

    const onRequestFinally = () => setStep(4);

    const toAuth = () => navigate('/auth');
    const toReg = () => window.location.reload();
    const onRepeatSubmit = () => regRequest(localData, onRequestFinally);

    const onClickForm = () => {
        switch (responseStatus) {
            case 200:
                return toAuth;
            case 400:
                return toReg;
            default:
                return onRepeatSubmit;
        }
    };

    const getModalStatus = () => {
        switch (responseStatus) {
            case 200:
                return STATUS_REGISTRATION[200];
            case 400:
                return STATUS_REGISTRATION[400];
            default:
                return STATUS_REGISTRATION.default;
        }
    };

    const handleSubmit = (data) => {
        setLocalData(data);
        regRequest(data, onRequestFinally);
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div data-test-id='auth' className='auth-layout'>
            <h3>Cleverland</h3>
            {(() => {
                switch (step) {
                    case 1:
                        return <RegistrationStep1 onClick={handleStep} />;
                    case 2:
                        return <RegistrationStep2 onClick={handleStep} />;
                    case 3:
                        return <RegistrationStep3 onSubmitForm={handleSubmit} />;
                    case 4:
                        return <FormWarning status={getModalStatus()} action={onClickForm()} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

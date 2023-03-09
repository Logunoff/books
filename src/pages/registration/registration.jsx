import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormWarning } from '../../components/form-warning/form-warning';
import { RegistrationStep1 } from '../../components/registration-step-1/registration-step-1';
import { RegistrationStep2 } from '../../components/registration-step-2/registration-step-2';
import { RegistrationStep3 } from '../../components/registration-step-3/registration-step-3';
import { useRegistrationRequest } from '../../hooks/useRegistrationRequest';

import './registration.css';

export const Registration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    // const [requestStatus, setRequestStatus] = useState(null);
    // const [actionStatus, setActionStatus] = useState(false);
    const handleStep = () => {
        setStep(step + 1);
    };

    const { regRequest, isLoading, errorStatus } = useRegistrationRequest();

    const onSuccess = () => {
        setStep(4);
    };

    const toAuth = () => {
        navigate('/auth');
    };
    const toReg = () => {
        navigate('/registration');
    };
    const onClickForm = () => {
        switch (errorStatus) {
            case 200:
                return toAuth;
            case 400:
                return toReg;
            default:
                return null;
        }
    };
    const handleSubmit = (data) => regRequest(data, onSuccess);

    return (
        <div className='auth-layout'>
            <h3>Cleverland</h3>
            {(() => {
                switch (step) {
                    case 1:
                        return <RegistrationStep1 onClick={handleStep} />;
                    case 2:
                        return <RegistrationStep2 onClick={handleStep} />;
                    case 3:
                        return <RegistrationStep3 onSubmitForm={handleSubmit} onClick={handleStep} />;
                    case 4:
                        return <FormWarning status={errorStatus} action={onClickForm} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { STATUS_REGISTRATION } from '../../constants/responce-status';
import { FormWarning } from '../../components/form-warning/form-warning';
import { RegistrationStep1 } from '../../components/registration-step-1/registration-step-1';
import { RegistrationStep2 } from '../../components/registration-step-2/registration-step-2';
import { RegistrationStep3 } from '../../components/registration-step-3/registration-step-3';
import { useRegistrationRequest } from '../../hooks/useRegistrationRequest';

import './registration.css';

export const Registration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [localData, setLocalData] = useState(null);
    // const [requestStatus, setRequestStatus] = useState(null);
    // const [actionStatus, setActionStatus] = useState(false);
    const { regRequest, isLoading, responseStatus } = useRegistrationRequest();

    const handleStep = () => setStep(step + 1);

    const onRequestFinally = () => setStep(4);

    const handleSubmit = (data) => {
        setLocalData(data);
        regRequest(data, onRequestFinally);
    };

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

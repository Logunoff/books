import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FormWarning } from '../../components/form-warning/form-warning';
import { RegistrationStep1 } from '../../components/registration-step-1/registration-step-1';
import { RegistrationStep2 } from '../../components/registration-step-2/registration-step-2';
import { RegistrationStep3 } from '../../components/registration-step-3/registration-step-3';
import { STATUS_REGISTRATION } from '../../constants/responce-status';
import { apiRegistration } from '../../constants/urls';

import './registration.css';

export const Registration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [requestStatus, setRequestStatus] = useState(null);
    const [actionStatus, setActionStatus] = useState(false);
    const handleStep = () => {
        setStep(step + 1);
    };

    console.log(requestStatus);

    const newUser = useSelector((state) => state.registration.registration);

    const toAuth = () => navigate('/auth');
    // const repeatSubmit = () => handleSubmit();
    const repeatRegistration = () => navigate('/registration');

    const handleSubmit = (data) => {
        axios
            .post(apiRegistration, {
                ...newUser,
                ...data,
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Server Error');
                }
                setStep(4);
                setRequestStatus(STATUS_REGISTRATION[200]);
                setActionStatus(toAuth);

                return response.data;
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setStep(4);
                    setRequestStatus(STATUS_REGISTRATION[400]);
                    setActionStatus(repeatRegistration);

                    return;
                }
                setStep(4);
                setRequestStatus(STATUS_REGISTRATION.default);
                // setActionStatus(repeatSubmit);
                console.log(error);
            });
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
                        return <RegistrationStep3 onSubmitForm={handleSubmit} onClick={handleStep} />;
                    case 4:
                        return <FormWarning status={requestStatus} action={actionStatus} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

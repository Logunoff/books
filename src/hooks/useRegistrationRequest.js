import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { STATUS_REGISTRATION } from '../constants/responce-status';
import { apiRegistration } from '../constants/urls';

export const useRegistrationRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null);

    const newUser = useSelector((state) => state.registration.registration);

    const regRequest = async (data, onSuccess) => {
        setIsLoading(true);

        axios
            .post(apiRegistration, {
                ...newUser,
                ...data,
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Server Error');
                }
                onSuccess();
                setErrorStatus(STATUS_REGISTRATION[200]);

                return response.data;
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    onSuccess();
                    setErrorStatus(STATUS_REGISTRATION[400]);

                    return;
                }
                onSuccess();
                setErrorStatus(STATUS_REGISTRATION.default);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    };

    return {
        regRequest,
        isLoading,
        errorStatus,
    };
};

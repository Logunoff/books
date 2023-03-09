import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { apiRegistration } from '../constants/urls';

export const useRegistrationRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

    const newUser = useSelector((state) => state.registration.registration);

    const regRequest = async (data, onFinally) => {
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
                setResponseStatus(response.status);

                return response.data;
            })
            .catch((error) => {
                setResponseStatus(error.response.status);
            })
            .finally(() => {
                setIsLoading(false);
                onFinally();
            });
    };

    return {
        regRequest,
        isLoading,
        responseStatus,
    };
};

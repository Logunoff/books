import { useState } from 'react';
import axios from 'axios';

import { apiResetPassword } from '../constants/urls';

export const useResetRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

    const resetRequest = async (code, data) => {
        setIsLoading(true);

        axios
            .post(apiResetPassword, {
                ...code,
                ...data,
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Server Error');
                }

                setResponseStatus(response.status)

                return response.data;
            })
            .catch((error) => {
                setResponseStatus(error.response.status)
            })
            .finally(() => setIsLoading(false))
    };

    return {
        resetRequest,
        isLoading,
        responseStatus,
    };
};

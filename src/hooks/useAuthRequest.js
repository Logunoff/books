import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import { apiLogin } from '../constants/urls';

export const useAuthRequest = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null);

    const authRequest = async (data) => {
        setIsLoading(true);

        axios
            .post(apiLogin, {
                ...data,
            })
            .then((response) => {
                Cookies.set('token', response.data.jwt);
                navigate('/');
            })
            .catch((error) => setErrorStatus(error.response.status))
            .finally(() => setIsLoading(false));
    };

    return {
        authRequest,
        isLoading,
        errorStatus,
    };
};

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthInterceptor = (token: string | null | undefined) => {

    const navigate = useNavigate();
    useEffect(() => {
        if (token && window.location.pathname === '/auth/login') {
            navigate('/users');
            return;
        }


        // if (!token) {
        //     navigate('/auth/login')
        //     return;
        // }

    }, [token, navigate]);
};

export default useAuthInterceptor;

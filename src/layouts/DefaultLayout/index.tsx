import React from 'react';
import { Outlet } from 'react-router-dom';
import TheHeader from "../../components/TheHeader";
import TheFooter from "../../components/TheFooter";
import './index.scss';

import Toast from "../../Toast";
import {useToken} from "../../hooks/useToken";
import useAuthInterceptor from "../../hooks/useAuthInterceptor";

const Layout: React.FC = () => {

    const {token} = useToken()
    useAuthInterceptor(token)

    return (
        <>
            <TheHeader />
            <div className='DefaultLayout'>
                <div className='container'>
                    <Outlet />
                </div>
            </div>
            <TheFooter />
            <Toast/>
        </>
    );
}

export default Layout;

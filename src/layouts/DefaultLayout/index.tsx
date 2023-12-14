import React from 'react';
import { Outlet } from 'react-router-dom';
import TheHeader from "../../components/TheHeader";
import TheFooter from "../../components/TheFooter";
import './index.scss';

const Layout: React.FC = () => {
    return (
        <>
            <TheHeader />
            <div className='DefaultLayout'>
                <div className='container'>
                    <Outlet />
                </div>
            </div>
            <TheFooter />
        </>
    );
}

export default Layout;

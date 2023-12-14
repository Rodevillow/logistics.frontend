import React from 'react';
import './index.scss';
import {Link, useLocation} from "react-router-dom";
import {useToken} from "../../hooks/useToken";

const TheHeader: React.FC = () => {

    const {token, handleLogout} = useToken();
    const location = useLocation();

    const isLinkActive = (path: string) => location.pathname === path;

    return (
        <header className='TheHeader'>
            <div className='container'>
                <div className='TheHeader__wrapper'>

                    <Link to='/users' className='TheHeader__logo'>Logistics App</Link>

                    <div className='TheHeader__menu'>
                        <div className='TheHeader__menu-left'>

                            <Link to='/users'
                                  className={`link ${isLinkActive('/users') ? 'active' : ''}`}
                            >
                                Users
                            </Link>

                            <Link to='/providers'
                                  className={`link ${isLinkActive('/providers') ? 'active' : ''}`}
                            >
                                Providers
                            </Link>

                            <Link to='/storages'
                                  className={`link ${isLinkActive('/storages') ? 'active' : ''}`}
                            >
                                Storages
                            </Link>

                            <Link to='/products'
                                  className={`link ${isLinkActive('/products') ? 'active' : ''}`}
                            >
                                Products
                            </Link>

                        </div>

                        <div className='TheHeader__menu-right'>
                            {
                                token ?
                                    <Link onClick={handleLogout} to='/auth/login'
                                          className={`link ${isLinkActive('/auth/login') ? 'active' : ''}`}
                                    >
                                        Logout
                                    </Link>
                                    :
                                    <Link to='/auth/login'
                                          className={`link ${isLinkActive('/auth/login') ? 'active' : ''}`}
                                    >
                                        Login
                                    </Link>
                            }


                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default TheHeader;

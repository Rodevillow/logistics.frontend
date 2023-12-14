import React from 'react';
// @ts-ignore
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import DefaultLayout from "./layouts/DefaultLayout";

import LoginPage from "./pages/Auth/LoginPage";

import ProductsPage from "./pages/ProductsPage";
import ProductsAddPage from "./pages/ProductsPage/ProductsAddPage";
import ProductsEditPage from "./pages/ProductsPage/ProductsEditPage";

import ProvidersPage from "./pages/ProvidersPage";
import ProvidersAddPage from "./pages/ProvidersPage/ProvidersAddPage";
import ProvidersEditPage from "./pages/ProvidersPage/ProvidersEditPage";

import StoragesPage from "./pages/StoragesPage";
import StoragesAddPage from "./pages/StoragesPage/StoragesAddPage";
import StoragesEditPage from "./pages/StoragesPage/StoragesEditPage";

import UsersPage from "./pages/UsersPage";
import UsersAddPage from "./pages/UsersPage/UsersAddPage";
import UsersEditPage from "./pages/UsersPage/UsersEditPage";

import './index.scss';



const App: React.FC = () => {



    return (
        <Router>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Navigate to="/users" />} />

                    <Route path="/auth/login" element={<LoginPage/>}/>

                    <Route path="/users" element={<UsersPage/>}/>
                    <Route path="/users/add" element={<UsersAddPage/>}/>
                    <Route path="/users/:user_id" element={<UsersEditPage />} />

                    <Route path="/providers" element={<ProvidersPage/>}/>
                    <Route path="/providers/add" element={<ProvidersAddPage/>}/>
                    <Route path="/providers/:provider_id" element={<ProvidersEditPage/>} />

                    <Route path="/storages" element={<StoragesPage/>}/>
                    <Route path="/storages/add" element={<StoragesAddPage/>}/>
                    <Route path="/storages/:storage_id" element={<StoragesEditPage/>} />

                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/products/add" element={<ProductsAddPage/>}/>
                    <Route path="/products/:product_id" element={<ProductsEditPage/>} />
                </Route>
            </Routes>
        </Router>
    );
}


export default App;


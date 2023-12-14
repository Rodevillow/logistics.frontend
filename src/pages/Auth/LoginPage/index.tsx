import React, {useState} from 'react';

import axios from "axios";

import UiInput from "../../../components/Ui/UiInput";
import UiButton from "../../../components/Ui/UiButton";

import './index.scss';

const LoginPage: React.FC = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorsFormData, setErrorsFormData] = useState({
        email: {
            errors: []
        },
        password: {
            errors: []
        },
    });

    const handleOnInputEmail = (event: any) => {
        setFormData((pre) => ({...pre, email: event.target.value}))
    }

    const handleOnInputPassword = (event: any) => {
        setFormData((pre) => ({...pre, password: event.target.value}))
    }

    const sendLoginRequest = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
            console.log(response.data);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.errors) {
                const newErrorsFormData: Record<string, { errors: string[] }> = {...errorsFormData};
                Object.keys(errorsFormData).forEach((key) => {
                    if (error.response.data.errors[key]) {
                        newErrorsFormData[key].errors = error.response.data.errors[key];
                    } else {
                        newErrorsFormData[key].errors = [];
                    }
                });
                // @ts-ignore
                setErrorsFormData(newErrorsFormData);
            }
            throw error;
        }
    }

    const handleClickSaveButton = async () => {
        try {
            await sendLoginRequest();
        } catch (error) {
            console.error('Error handleClickSaveButton:', error);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <div className='LoginPage__email'>
                <UiInput
                    placeholder='Enter email'
                    label='Email'
                    type='text'
                    id='email'
                    value={formData.email}
                    onInput={handleOnInputEmail}
                    isInvalid={errorsFormData.email.errors.length > 0}
                />
                {errorsFormData.email.errors.map((error:string, key:number) => (
                    <span className='error' key={key}>{error}</span>
                ))}
            </div>
            <div className='LoginPage__password'>
                <UiInput
                    placeholder='Enter password'
                    label='Password'
                    type='password'
                    id='email'
                    value={formData.password}
                    onInput={handleOnInputPassword}
                    isInvalid={errorsFormData.password.errors.length > 0}
                />
                {errorsFormData.password.errors.map((error:string, key:number) => (
                    <span className='error' key={key}>{error}</span>
                ))}
            </div>
            <div className='LoginPage__save'>
                <UiButton label='Save' id='save' onClick={handleClickSaveButton} />
            </div>
        </div>
    );
}

export default LoginPage;

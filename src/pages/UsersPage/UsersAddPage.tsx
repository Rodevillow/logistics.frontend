import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

import axios from "axios";

import UiInput from "../../components/Ui/UiInput";
import UiButton from "../../components/Ui/UiButton";

import './index.scss';

const UsersAddPage: React.FC = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errorsFormData, setErrorsFormData] = useState({
        name: {
            errors: []
        },
        email: {
            errors: []
        },
        password: {
            errors: []
        },
    });

    const handleOnInputName = (event: any) => {
        setFormData((pre) => ({...pre, name: event.target.value}))
    }
    const handleOnInputEmail = (event: any) => {
        setFormData((pre) => ({...pre, email: event.target.value}))
    }
    const handleOnInputPassword = (event: any) => {
        setFormData((pre) => ({...pre, password: event.target.value}))
    }

    const handleClickSaveButton = async () => {
        try {
            await createNewUserRequest();
            navigate("/users");
        } catch (error) {
            console.error('Error handleClickSaveButton:', error);
        }
    }

    const createNewUserRequest = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/', formData);
            setFormData((pre) => ({
                ...pre,
                name: response.data.data.name,
                email: response.data.data.email,
                password: response.data.data.password,
            }))
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.errors) {
                const newErrorsFormData: Record<string, { errors: string[] }> = { ...errorsFormData };

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
    };

    return (
        <div className='UsersAddPage'>
            <h1>Create new user</h1>
            <div className='UsersAddPage__name'>
                <UiInput
                    placeholder='Enter name'
                    label='Name'
                    type='text'
                    id='name'
                    value={formData.name}
                    onInput={handleOnInputName}
                    isInvalid={errorsFormData.name.errors.length > 0}
                />
                {errorsFormData.name.errors.map((error:string, key:number) => (
                    <span className='error' key={key}>{error}</span>
                ))}
            </div>
            <div className='UsersAddPage__email'>
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
            <div className='UsersAddPage__password'>
                <UiInput
                    placeholder='Enter password'
                    label='Password'
                    type='password'
                    id='password'
                    value={formData.password}
                    onInput={handleOnInputPassword}
                    isInvalid={errorsFormData.password.errors.length > 0}
                />
                {errorsFormData.password.errors.map((error:string, key:number) => (
                    <span className='error' key={key}>{error}</span>
                ))}
            </div>
            <div className='UsersAddPage__save'>
                <UiButton label='Save' id='save' onClick={handleClickSaveButton} />
            </div>
        </div>
    );
}

export default UsersAddPage;

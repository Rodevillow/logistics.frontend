import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import axios from "axios";

import UiInput from "../../components/Ui/UiInput";
import UiButton from "../../components/Ui/UiButton";

import './index.scss';

const UsersEditPage: React.FC = () => {

    const {user_id} = useParams();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [errorsFormData, setErrorsFormData] = useState({
        name: {
            errors: []
        },
        email: {
            errors: []
        },
    });

    const handleOnInputName = (event: any) => {
        setFormData((pre) => ({...pre, name: event.target.value}))
    }
    const handleOnInputEmail = (event: any) => {
        setFormData((pre) => ({...pre, email: event.target.value}))
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/' + user_id);
            setFormData((pre) => ({...pre,
                name: response.data.data.name, email: response.data.data.email}))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateUserRequest = async () => {
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/users/' + user_id, formData);
            setFormData((pre) => ({
                ...pre,
                name: response.data.data.name,
                email: response.data.data.email,
                password: response.data.data.password,
            }))
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
            await updateUserRequest();
        } catch (error) {
            console.error('Error handleClickSaveButton:', error);
        }
    }

    useEffect(() => { fetchData() }, []);

    return (
        <div className='UsersEditPage'>
            <h1>{user_id}</h1>
            <div className='UsersEditPage__name'>
                <UiInput
                    placeholder='Enter name'
                    label='Name'
                    type='text'
                    id='name'
                    value={formData.name}
                    onInput={handleOnInputName}
                    isInvalid={false}
                />
            </div>
            <div className='UsersEditPage__email'>
                <UiInput
                    placeholder='Enter email'
                    label='Email'
                    type='text'
                    id='name'
                    value={formData.email}
                    onInput={handleOnInputEmail}
                    isInvalid={false}
                />
            </div>
            <div className='UsersEditPage__save'>
                <UiButton label='Save' id='save' onClick={handleClickSaveButton} />
            </div>
        </div>
    );
}

export default UsersEditPage;
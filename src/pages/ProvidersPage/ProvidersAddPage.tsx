import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

import axios from "axios";

import UiInput from "../../components/Ui/UiInput";
import UiButton from "../../components/Ui/UiButton";

import './index.scss';

const ProvidersAddPage: React.FC = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
    });
    const [errorsFormData, setErrorsFormData] = useState({
        name: {
            errors: []
        },
        address: {
            errors: []
        },
    });

    const handleOnInputName = (event: any) => {
        setFormData((pre) => ({...pre, name: event.target.value}))
    }

    const handleOnInputAddress = (event: any) => {
        setFormData((pre) => ({...pre, address: event.target.value}))
    }

    const handleClickSaveButton = async () => {
        try {
            await createNewProviderRequest();
            navigate("/providers");
        } catch (error) {
            console.error('Error handleClickSaveButton:', error);
        }
    }

    const createNewProviderRequest = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/providers/', formData);
            setFormData((pre) => ({ ...pre,
                name: response.data.data.name, address: response.data.data.address }))
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
        <div className='ProvidersAddPage'>
            <h1>Create new provider</h1>
            <div className='ProvidersAddPage__name'>
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
            <div className='ProvidersAddPage__address'>
                <UiInput
                    placeholder='Enter address'
                    label='Address'
                    type='text'
                    id='address'
                    value={formData.address}
                    onInput={handleOnInputAddress}
                    isInvalid={errorsFormData.address.errors.length > 0}
                />
                {errorsFormData.address.errors.map((error:string, key:number) => (
                    <span className='error' key={key}>{error}</span>
                ))}
            </div>
            <div className='ProvidersAddPage__save'>
                <UiButton label='Save' id='save' onClick={handleClickSaveButton} />
            </div>
        </div>
    );
}

export default ProvidersAddPage;

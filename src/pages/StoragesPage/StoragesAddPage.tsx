import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

import axios from "axios";

import UiInput from "../../components/Ui/UiInput";
import UiButton from "../../components/Ui/UiButton";

import './index.scss';

const StoragesAddPage: React.FC = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        address: "",
    });
    const [errorsFormData, setErrorsFormData] = useState({
        address: {
            errors: []
        },
    });

    const handleOnInputAddress = (event: any) => {
        setFormData((pre) => ({...pre, address: event.target.value}))
    }

    const handleClickSaveButton = async () => {
        try {
            await createNewStorageRequest();
            navigate("/storages");
        } catch (error) {
            console.error('Error handleClickSaveButton:', error);
        }
    }

    const createNewStorageRequest = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/storages/', formData);
            setFormData((pre) => ({ ...pre, address: response.data.data.address }))
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
        <div className='StoragesAddPage'>
            <h1>Create new storage</h1>
            <div className='StoragesAddPage__address'>
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
            <div className='StoragesAddPage__save'>
                <UiButton label='Save' id='save' onClick={handleClickSaveButton} />
            </div>
        </div>
    );
}

export default StoragesAddPage;

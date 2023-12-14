import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from "axios";

import UiInput from "../../components/Ui/UiInput";
import UiButton from "../../components/Ui/UiButton";

import './index.scss';

const StoragesEditPage: React.FC = () => {

    const navigate = useNavigate();

    const {storage_id} = useParams();

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

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/storages/' + storage_id);
            setFormData((pre) => ({...pre, address: response.data.data.address}))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateStorageRequest = async () => {
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/storages/' + storage_id, formData);
            setFormData((pre) => ({ ...pre, address: response.data.data.address }))
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
            await updateStorageRequest();
            navigate("/storages");
        } catch (error) {
            console.error('Error handleClickSaveButton:', error);
        }
    }

    useEffect(() => { fetchData() }, []);

    return (
        <div className='StoragesEditPage'>
            <h1>{storage_id}</h1>
            <div className='StoragesEditPage__address'>
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
            <div className='StoragesEditPage__save'>
                <UiButton label='Save' id='save' onClick={handleClickSaveButton} />
            </div>
        </div>
    );
}

export default StoragesEditPage;
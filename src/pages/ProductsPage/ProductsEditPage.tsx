import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from "axios";

import UiInput from "../../components/Ui/UiInput";
import UiButton from "../../components/Ui/UiButton";

import './index.scss';

const ProductsEditPage: React.FC = () => {

    const navigate = useNavigate();

    const {product_id} = useParams();

    const [formData, setFormData] = useState({
        title: "",
        price: "",
    });
    const [errorsFormData, setErrorsFormData] = useState({
        title: {
            errors: []
        },
        price: {
            errors: []
        },
    });

    const handleOnInputTitle = (event: any) => {
        setFormData((pre) => ({...pre, title: event.target.value}))
    }

    const handleOnInputPrice = (event: any) => {
        setFormData((pre) => ({...pre, price: event.target.value}))
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products/' + product_id);
            setFormData((pre) => ({...pre,
                title: response.data.data.title,
                price: response.data.data.price,
                provider: response.data.data.provider,
                provider_id: response.data.data.provider_id,
                storage: response.data.data.storage,
                storage_id: response.data.data.storage_id,
            }))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateProductRequest = async () => {
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/products/' + product_id, formData);
            setFormData((pre) => ({ ...pre,
                title: response.data.data.title,
                price: response.data.data.price,
                provider: response.data.data.provider,
                provider_id: response.data.data.provider_id,
                storage: response.data.data.storage,
                storage_id: response.data.data.storage_id,
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
            await updateProductRequest();
            navigate("/products");
        } catch (error) {
            console.error('Error handleClickSaveButton:', error);
        }
    }

    useEffect(() => { fetchData() }, []);

    return (
        <div className='ProductsEditPage'>
            <h1>{product_id}</h1>
            <div className='ProductsEditPage__title'>
                <UiInput
                    placeholder='Enter title'
                    label='Title'
                    type='text'
                    id='title'
                    value={formData.title}
                    onInput={handleOnInputTitle}
                    isInvalid={errorsFormData.title.errors.length > 0}
                />
                {errorsFormData.title.errors.map((error:string, key:number) => (
                    <span className='error' key={key}>{error}</span>
                ))}
            </div>
            <div className='ProductsEditPage__price'>
                <UiInput
                    placeholder='Enter price'
                    label='Price'
                    type='text'
                    id='price'
                    value={formData.price}
                    onInput={handleOnInputPrice}
                    isInvalid={errorsFormData.price.errors.length > 0}
                />
                {errorsFormData.price.errors.map((error:string, key:number) => (
                    <span className='error' key={key}>{error}</span>
                ))}
            </div>
            <div className='ProductsEditPage__save'>
                <UiButton label='Save' id='save' onClick={handleClickSaveButton} />
            </div>
        </div>
    );
}

export default ProductsEditPage;
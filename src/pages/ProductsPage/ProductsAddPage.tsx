import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

import axios from "axios";

import UiInput from "../../components/Ui/UiInput";
import UiButton from "../../components/Ui/UiButton";

import './index.scss';

const ProductsAddPage: React.FC = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        provider_id: "",
        product_id: "",
    });
    const [errorsFormData, setErrorsFormData] = useState({
        title: {
            errors: []
        },
        price: {
            errors: []
        },
        provider_id: {
            errors: []
        },
        product_id: {
            errors: []
        },
    });

    const handleOnInputTitle = (event: any) => {
        setFormData((pre) => ({...pre, title: event.target.value}))
    }

    const handleOnInputPrice = (event: any) => {
        setFormData((pre) => ({...pre, price: event.target.value}))
    }

    const handleClickSaveButton = async () => {
        try {
            await createNewProductRequest();
            navigate("/products");
        } catch (error) {
            console.error('Error handleClickSaveButton:', error);
        }
    }

    const createNewProductRequest = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/products/', formData);
            setFormData((pre) => ({ ...pre, title: response.data.data.title }))
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
        <div className='ProductsAddPage'>
            <h1>Create new product</h1>
            <div className='ProductsAddPage__title'>
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
            <div className='ProductsAddPage__price'>
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
            <div className='ProductsAddPage__save'>
                <UiButton label='Save' id='save' onClick={handleClickSaveButton} />
            </div>
        </div>
    );
}

export default ProductsAddPage;

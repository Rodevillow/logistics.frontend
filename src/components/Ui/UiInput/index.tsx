import React from 'react';
import './index.scss';

interface UiInputProps {
    label: string;
    type: string;
    id: string;
    value: string;
    placeholder: string;
    onInput?: any;
    onFocus?: any;
    onBlur?: any;
    isInvalid?: boolean;
}

const UsersEditPage: React.FC<UiInputProps> = ({label, type = 'text', id, value, placeholder, onInput, onFocus, onBlur, isInvalid}) => {

    return (
        <div className='UiInput'>
            <label htmlFor={id} className='UiInput__label'>Label ({label})</label>
            <input
                className={`UiInput__input ${isInvalid ? 'is-invalid' : ''}`}
                type={type}
                id={id}
                onInput={onInput}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
            />
        </div>
    );
}

export default UsersEditPage;

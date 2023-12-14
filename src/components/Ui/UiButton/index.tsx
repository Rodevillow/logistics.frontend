import React from 'react';
import './index.scss';

interface UiButtonProps {
    label: string;
    id: string;
    onClick?: any;
}

const UiButton: React.FC<UiButtonProps> = ({label, id, onClick}) => {

    return (
        <button
            className='UiButton'
            id={id}
            onClick={onClick}
        >{label}</button>
    );
}

export default UiButton;

import React from 'react';
// @ts-ignore
import IconTrash from '../../../assets/icons/trash.svg';

interface TrashIconProps {
    onClick: any;
}

const TrashIcon: React.FC<TrashIconProps> = ({ onClick }) => {
    return (<img src={IconTrash} onClick={onClick} alt="Trash" />);
};

export default TrashIcon;

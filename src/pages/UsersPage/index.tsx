import axios from "axios";
import React, {useEffect, useState} from 'react';

import Pagination from "../../components/Pagination";

import './index.scss';
import {Link} from "react-router-dom";
import EditIcon from "../../components/Ui/Icons/EditIcon";
import TrashIcon from "../../components/Ui/Icons/TrashIcon";
import UiButton from "../../components/Ui/UiButton";

const UsersPage: React.FC = () => {


    interface TransformedData {
        id: string;
        name: string;
        email: string;
        created_at: string;
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);

    const [data, setData] = useState<any[]>([]);

    const fetchData = async (page: number) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users?page=' + page);

            const transformedData: TransformedData[] = response.data.data.map((item: TransformedData) => ({
                id: item.id,
                name: item.name,
                email: item.email,
                created_at: item.created_at,
            }));

            setData(transformedData)
            setLastPage(response.data.last_page);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => { fetchData(currentPage) }, []);

    const handlePageChange = async (newPage: number) => {
        setCurrentPage(newPage);
        await fetchData(newPage);
    };

    const handleOnDelete = async (uuid:string) => {
        try {
            await axios.delete('http://127.0.0.1:8000/api/users/' + uuid);
            await fetchData(currentPage);
        } catch (error) {
            console.error('Error delete:', error);
        }
    }
    return (
        <div className='UsersPage'>

            <h1>Users list</h1>

            <div className='UsersPage__AddNewUser'>
                <Link to='/users/add'>
                    <UiButton label='Add new user' id='add-new-user' />
                </Link>
            </div>

            {data.map((item, rowIndex) => (
                <div key={rowIndex} className='UserItem'>
                    <div className='UserItem__Id'>{item.id}</div>
                    <div className='UserItem__Name'>{item.name}</div>
                    <div className='UserItem__Email'>{item.email}</div>
                    <div className='UserItem__CreatedAt'>{item.created_at}</div>
                    <div className='UserItem__Edit'>
                        <Link to={`/users/${item.id}`}>
                            <EditIcon />
                        </Link>
                    </div>
                    <div className='UserItem__Delete'>
                        <TrashIcon onClick={() => handleOnDelete(item.id) } />
                    </div>
                </div>
            ))}

            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default UsersPage;

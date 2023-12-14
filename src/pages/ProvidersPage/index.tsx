import axios from "axios";
import React, {useEffect, useState} from 'react';

import Pagination from "../../components/Pagination";

import './index.scss';
import {Link} from "react-router-dom";
import EditIcon from "../../components/Ui/Icons/EditIcon";
import TrashIcon from "../../components/Ui/Icons/TrashIcon";
import UiButton from "../../components/Ui/UiButton";

const ProviderPage: React.FC = () => {

    interface TransformedData {
        id: string;
        name: string;
        address: string;
        created_at: string;
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);

    const [data, setData] = useState<any[]>([]);

    const fetchData = async (page: number) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/providers?page=' + page);

            const transformedData: TransformedData[] = response.data.data.map((item: TransformedData) => ({
                id: item.id,
                name: item.name,
                address: item.address,
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
            await axios.delete('http://127.0.0.1:8000/api/providers/' + uuid);
            await fetchData(currentPage);
        } catch (error) {
            console.error('Error delete:', error);
        }
    }

    return (
        <div className='ProvidersPage'>

            <h1>Providers list</h1>

            <div className='ProvidersPage__AddNewProvider'>
                <Link to='/providers/add'>
                    <UiButton label='Add new provider' id='add-new-provider' />
                </Link>
            </div>

            {data.map((item, rowIndex) => (
                <div key={rowIndex} className='ProviderItem'>
                    <div className='ProviderItem__Name'>{item.name}</div>
                    <div className='ProviderItem__Address'>{item.address}</div>
                    <div className='ProviderItem__Edit'>
                        <Link to={`/providers/${item.id}`}>
                            <EditIcon />
                        </Link>
                    </div>
                    <div className='ProviderItem__Delete'>
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

export default ProviderPage;


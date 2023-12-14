import axios from "axios";
import React, {useEffect, useState} from 'react';

import Pagination from "../../components/Pagination";

import './index.scss';
import {Link} from "react-router-dom";
import EditIcon from "../../components/Ui/Icons/EditIcon";
import TrashIcon from "../../components/Ui/Icons/TrashIcon";
import UiButton from "../../components/Ui/UiButton";

const ProductPage: React.FC = () => {

    interface TransformedData {
        id: string;
        title: string;
        price: number;
        provider: string;
        provider_id: string;
        storage: string;
        storage_id: string;
        created_at: string;
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);

    const [data, setData] = useState<any[]>([]);

    const fetchData = async (page: number) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products?page=' + page);

            const transformedData: TransformedData[] = response.data.data.map((item: TransformedData) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                provider: item.provider,
                provider_id: item.provider_id,
                storage: item.storage,
                storage_id: item.storage_id,
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
            await axios.delete('http://127.0.0.1:8000/api/products/' + uuid);
            await fetchData(currentPage);
        } catch (error) {
            console.error('Error delete:', error);
        }
    }

    return (
        <div className='ProductsPage'>

            <h1>Products list</h1>

            <div className='ProductsPage__AddNewProduct'>
                <Link to='/products/add'>
                    <UiButton label='Add new product' id='add-new-product' />
                </Link>
            </div>

            {data.map((item, rowIndex) => (
                <div key={rowIndex} className='ProductItem'>
                    <div className='ProductItem__Title'>{item.title}</div>
                    <div className='ProductItem__Price'>{item.price}</div>
                    <div className='ProductItem__Provider'>Provider: {item.provider}</div>
                    <div className='ProductItem__Storage'>Storage: {item.storage}</div>
                    <div className='ProductItem__CreatedAt'>{item.created_at}</div>
                    <div className='ProductItem__Edit'>
                        <Link to={`/products/${item.id}`}>
                            <EditIcon />
                        </Link>
                    </div>
                    <div className='ProductItem__Delete'>
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

export default ProductPage;


import React from 'react';
import './index.scss';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: any;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, onPageChange }) => {
    const renderPageButtons = () => {
        return (
            <div className='Pagination'>
                {lastPage !== 1 && (
                    <button key={1} onClick={() => goToPage(1)}>
                        1
                    </button>
                )}
                {currentPage > 1 && (
                    <button className='Pagination--disabled' onClick={() => goToPage(currentPage - 1)}>{'<'}</button>
                )}
                {currentPage > 2 && (
                    <button key={currentPage - 1} onClick={() => goToPage(currentPage - 1)}>
                        {currentPage - 1}
                    </button>
                )}
                {currentPage > 1 && (
                <button key={currentPage} onClick={() => goToPage(currentPage)}>
                    {currentPage}
                </button>
                )}
                {currentPage < lastPage - 2 && (
                    <button key={currentPage + 1} onClick={() => goToPage(currentPage + 1)}>
                        {currentPage + 1}
                    </button>
                )}
                {currentPage < lastPage && (
                    <button className='Pagination--disabled' onClick={() => goToPage(currentPage + 1)}>{'>'}</button>
                )}
                {currentPage < lastPage && (
                    <button key={lastPage} onClick={() => goToPage(lastPage)}>
                        {lastPage}
                    </button>
                )}
            </div>
        );
    };

    const goToPage = (page: number) => {
        console.log(`Go to page ${page}`);
        onPageChange(page);
    };

    return <div>{renderPageButtons()}</div>;
};

export default Pagination;

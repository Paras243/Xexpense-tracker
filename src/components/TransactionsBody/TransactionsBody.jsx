

import React, { useContext, useEffect, useState } from 'react';
import "./TransactionsBody.css";
import TransactionBar from '../TransactionBar/TransactionBar';
import PageNavigateBar from './PageNavigateBar';
import { TransactionsContext } from '../../Contexts/AllContexts';

const TransactionsBody = () => {
    const [transactions] = useContext(TransactionsContext);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    useEffect(() => {
        updatePagination();
    }, [transactions]);

    const displayTransactions = () => {
        if (!transactions || !transactions.length) return null;

        const startIdx = (pagination.currentPage - 1) * 5;
        const endIdx = startIdx + 5;

        return transactions.slice(startIdx, endIdx).map((transaction, index) => (
            <TransactionBar
                key={transaction.id || index}
                name={transaction.name}
                date={transaction.date}
                amount={transaction.price}
                category={transaction.category}
                id={transaction.id}
            />
        ));
    };

    const updatePagination = () => {
        const total = Math.ceil(transactions.length / 5);
        setPagination({ currentPage: 1, totalPages: total });
    };

    const changePage = (direction) => {
        const { currentPage, totalPages } = pagination;
        if (direction === "right" && currentPage < totalPages) {
            setPagination({ ...pagination, currentPage: currentPage + 1 });
        } else if (direction === "left" && currentPage > 1) {
            setPagination({ ...pagination, currentPage: currentPage - 1 });
        }
    };

    return (
        <div className='TransactionBody'>
            <div className='transactionBodyUpper'>
                <div className='transactionPage'>{displayTransactions()}</div>
            </div>
            <div className='transactionBodyLower'>
                <PageNavigateBar pages={pagination} updatePage={changePage} />
            </div>
        </div>
    );
};

export default TransactionsBody;

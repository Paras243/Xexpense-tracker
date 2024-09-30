import React from 'react';
import "./Transactions.css";
import TransactionsBody from '../TransactionsBody/TransactionsBody';

const Transactions = () => {
    return (
        <div className='Transactions'>
            <h2>Recent Transactions</h2>
            <TransactionsBody />
        </div>
    );
};

export default Transactions;
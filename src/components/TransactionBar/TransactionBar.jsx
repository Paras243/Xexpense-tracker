import React, { useContext, useState } from 'react';
import "./TransactionBar.css";
import foodIcon from "../../assets/food.svg";
import movieIcon from "../../assets/movie.svg";
import travelIcon from "../../assets/travel.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { MoneyContext, TransactionsContext } from '../../Contexts/AllContexts';

const TransactionBar = ({ name, date, amount, category, id }) => {
    const [money, setMoney] = useContext(MoneyContext);
    const [transactions, setTransactions] = useContext(TransactionsContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const getCategoryIcon = () => {
        switch (category) {
            case "food":
                return foodIcon;
            case "entertainment":
                return movieIcon;
            case "Bus":
            case "Auto":
            case "travel":
                return travelIcon;
            default:
                return null;
        }
    };

    const handleDeleteTransaction = () => {
        const transactionIndex = transactions.findIndex(transaction => transaction.id === id);

        if (transactionIndex !== -1) {
            const updatedBalance = money.balance + Number(amount);
            const updatedExpenses = money.expenses - Number(amount);

            const updatedTransactions = [...transactions];
            updatedTransactions.splice(transactionIndex, 1);

            setTransactions(updatedTransactions);
            setMoney({ balance: updatedBalance, expenses: updatedExpenses });
        }
    };

    return (
        <div className='TransactionBar'>
            <span className='transactionIcon'>
                <img src={getCategoryIcon()} alt={category} />
            </span>
            <span className='TransactionBarBody'>
                <span className='TransactionText'>
                    <span className='TransactionName'>{name}</span>
                    <span className='TransactionDate'>{date}</span>
                </span>
                <span className='TransactionAmount cardTextRed'>₹{amount}</span>
            </span>
            <Button icon={deleteIcon} buttonSize="smallButton" background="backgroundRed" clickFunction={handleDeleteTransaction} />
            <Button icon={editIcon} buttonSize="smallButton" background="backgroundOrange" clickFunction={handleToggleModal} />
            {isModalOpen && (
                <Modal 
                    toggleModal={handleToggleModal} 
                    text="Edit Expense"
                    existingData={{ name, date, amount, category, id }} 
                />
            )}
        </div>
    );
};

export default TransactionBar;

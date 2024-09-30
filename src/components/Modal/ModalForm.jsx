import React, { useContext, useEffect, useState } from 'react';
import FormButtons from '../FormButtons/FormButtons';
import { MoneyContext, TransactionsContext } from '../../Contexts/AllContexts';

const ModalForm = ({ toggleModal, formType, existingData }) => {
    const [money, setMoney] = useContext(MoneyContext);
    const [transactions, setTransactions] = useContext(TransactionsContext);
    
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        date: new Date().toISOString().split("T")[0], 
        category: "",
    });
    const [incomeData, setIncomeData] = useState({ income: "" });

    useEffect(() => {
        if (existingData) {
            loadExistingData();
        }
    }, []);

    const loadExistingData = () => {
        const { name, date, amount, category } = existingData;
        setFormData({
            name: name,
            price: amount,
            date: date,
            category: category
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formType === "Add Balance") {
            setMoney(prev => ({
                ...prev,
                balance: prev.balance + Number(incomeData.income),
            }));
        } else if (formType === "Add Expense") {
            addExpense();
        } else if (formType === "Edit Expense") {
            editExpense();
        }

        toggleModal();
    };

    const addExpense = () => {
        const newExpense = money.expenses + Number(formData.price);
        const newBalance = money.balance - Number(formData.price);

        if (newBalance < 0) {
            alert("Not enough balance");
            return;
        }

        const newTransaction = { ...formData, id: new Date().getTime() };
        setTransactions([...transactions, newTransaction]);
        setMoney({ balance: newBalance, expenses: newExpense });
    };

    const editExpense = () => {
        const updatedExpense = money.expenses + Number(formData.price) - Number(existingData.amount);
        const updatedBalance = money.balance - Number(formData.price) + Number(existingData.amount);

        if (updatedBalance < 0) {
            alert("Not enough balance");
            return;
        }

        const updatedTransaction = { ...formData, id: existingData.id };
        const updatedTransactions = transactions.map((transaction) =>
            transaction.id === existingData.id ? updatedTransaction : transaction
        );

        setTransactions(updatedTransactions);
        setMoney({ balance: updatedBalance, expenses: updatedExpense });
    };

    const expenseInputs = () => (
        <div className='formInputsDiv'>
            <input
                required
                value={formData.name}
                className="formInput"
                onChange={handleInputChange}
                placeholder='Title'
                type='text'
                name='name'
                autoFocus
            />
            <input
                required
                value={formData.price}
                className="formInput"
                onChange={handleInputChange}
                placeholder='Price'
                type='number'
                name='price'
            />
            <select
                value={formData.category}
                className="formInput"
                onChange={handleInputChange}
                name='category'>
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
                <option value="travel">Travel</option>
            </select>
            <input
                required
                value={formData.date}
                className="formInput"
                onChange={handleInputChange}
                type='date'
                name='date'
            />
        </div>
    );

    const incomeInput = () => (
        <div className='balanceFormInputDiv'>
            <input
                className="formInput"
                onChange={(e) => setIncomeData({ income: +e.target.value })}
                placeholder='Income Amount'
                type='number'
                name='income'
                value={incomeData.income}
                required
            />
        </div>
    );

    return (
        <form className='modalForm expensesForm' onSubmit={handleSubmit}>
            {formType === "Add Balance" ? incomeInput() : expenseInputs()}
            <FormButtons text={formType} toggleModal={toggleModal} />
        </form>
    );
};

export default ModalForm;

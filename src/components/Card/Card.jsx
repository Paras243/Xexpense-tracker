import React, { useState } from 'react';
import "./Card.css";
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

const Card = ({ text, value }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    
    const handleModalToggle = () => {
        setIsModalVisible(prev => !prev);
    };

    return (
        <div className='card'>
            <div className='cardText'>
                <span>{text}: </span>
                <span className={text === "Expenses" ? "cardTextRed" : "cardTextGreen"}>
                    ₹{value}
                </span>
            </div>
            <Button 
                text={text === "Expenses" ? "Add Expense" : "Add Income"}
                background={text === "Expenses" ? "gradientRed" : "gradientGreen"}
                buttonSize="largeButton"
                clickFunction={handleModalToggle}
            />
            {isModalVisible && (
                <Modal 
                    toggleModal={handleModalToggle} 
                    text={text === "Expenses" ? "Add Expense" : "Add Balance"} 
                />
            )}
        </div>
    );
};

export default Card;

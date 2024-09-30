import React from 'react';
import "./Button.css";

const Button = ({ text, background, buttonSize, icon, clickFunction, buttonType = "button" }) => {
    return (
        <button 
            className={`Button ${buttonSize} ${background}`} 
            onClick={clickFunction} 
            type={buttonType}
        >
            {text ? text : <img src={icon} alt="button icon" />}
        </button>
    );
};

export default Button;

import React from 'react';
import "./TransactionsBody.css";
import leftArrowIcon from "../../assets/leftArrow.svg";
import rightArrowIcon from "../../assets/rightArrow.svg";

import Button from '../Button/Button';

const PageNavigateBar = ({ pages, updatePage }) => {
    const isFirstPage = pages.currentPage === 1;
    const isLastPage = pages.currentPage === pages.totalPages;

    return (
        <div className="TransactionBar PageNavigateBar">
            <Button
                icon={leftArrowIcon}
                buttonSize="smallButton"
                background={!isFirstPage ? "shadow" : ""}
                clickFunction={() => updatePage("left")}
            />
            <Button
                text={pages.currentPage}
                buttonSize="mediumButton"
                background="backgroundDarkGreen"
            />
            <Button
                icon={rightArrowIcon}
                buttonSize="smallButton"
                background={!isLastPage ? "shadow" : ""}
                clickFunction={() => updatePage("right")}
            />
        </div>
    );
};

export default PageNavigateBar;

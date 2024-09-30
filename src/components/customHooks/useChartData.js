import React, { useContext, useEffect, useState } from 'react';
import { TransactionsContext } from '../../Contexts/AllContexts';

const useChartData = (initialData) => {
    const [transactions] = useContext(TransactionsContext);

    const [chartData, setChartData] = useState(initialData);

    useEffect(() => {
        setChartData([
            { name: 'Entertainment', value: 0 },
            { name: 'Food', value: 0 },
            { name: 'Travel', value: 0 },
        ]);

        updateCategoryTotals();
    }, [transactions]);

    const updateCategoryTotals = () => {
        let foodTotal = 0;
        let entertainmentTotal = 0;
        let travelTotal = 0;

        transactions.forEach((transaction) => {
            const { category, price } = transaction;
            const amount = Number(price);

            if (category === 'food') {
                foodTotal += amount;
                setChartData(prevData => [
                    prevData[0], 
                    { ...prevData[1], value: foodTotal }, 
                    prevData[2]  
                ]);
            } else if (category === 'entertainment') {
                entertainmentTotal += amount;
                setChartData(prevData => [
                    { ...prevData[0], value: entertainmentTotal }, 
                    prevData[1],  
                    prevData[2]   
                ]);
            } else if (category === 'travel') {
                travelTotal += amount;
                setChartData(prevData => [
                    prevData[0],  
                    prevData[1],  
                    { ...prevData[2], value: travelTotal } 
                ]);
            }
        });
    };

    return chartData;
};

export default useChartData;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = (start, end) => {
        let url = 'https://gloma-backend.onrender.com/api/expenses';
        if (start && end) {
            url += `/date-range?start=${start}&end=${end}`;
        }
        axios.get(url)
            .then(response => {
                setExpenses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the expenses!', error);
            });
    };

    const handleFilter = (e) => {
        e.preventDefault();
        fetchExpenses(startDate, endDate);
    };

    const handleExport = () => {
        axios.get('https://gloma-backend.onrender.com/api/expenses/export', {
            responseType: 'blob', // Important for handling PDF response
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Expenses.pdf');
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
            console.error('There was an error exporting the expenses!', error);
        });
    };

    return (
        <div>
            <h1>Gastos</h1>
            <form onSubmit={handleFilter}>
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    required 
                />
                <button type="submit">Filtrar</button>
            </form>
            <button onClick={handleExport}>Exportar a PDF</button>
            <ul>
                {expenses.map(expense => (
                    <li key={expense._id}>
                        {expense.product} - ${expense.price} - {new Date(expense.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUseStyles, useTheme } from 'react-jss';
import { FaDollarSign, FaPlusCircle, FaTrash } from 'react-icons/fa';  // Importar el icono de eliminar
import ChartComponent from './ChartComponent';

const useStyles = createUseStyles((theme) => ({
    container: {
        padding: 20,
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },
    aboutUsButton: {
        backgroundColor: '#f4ad79',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: 16,
        transition: 'background-color 0.3s, transform 0.3s',
        '&:hover': {
            backgroundColor: '#45A049',
            transform: 'scale(1.05)'
        },
        '&:active': {
            backgroundColor: '#3e8e41',
            transform: 'scale(0.95)'
        }
    },
    overview: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: 10
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 800,
        gap: 10,
        marginBottom: 10
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        flex: '1',
        minWidth: 150,
        maxWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icon: {
        fontSize: 40,
        marginBottom: 8,
        color: '#4CAF50'
    },
    chartContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        flex: '2',
        minWidth: 300
    },
    selectContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1'
    },
    listContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: 800,
        marginBottom: 10
    },
    formButton: {
        padding: 10,
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontSize: 16,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteIcon: {
        fontSize: 20,
        color: '#e74c3c',
        cursor: 'pointer',
        marginLeft: 10,
        transition: 'color 0.3s',
        '&:hover': {
            color: '#c0392b'
        }
    }
}));

const Dashboard = () => {
    const [totals, setTotals] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [expenses, setExpenses] = useState([]);
    const theme = useTheme();
    const classes = useStyles({ theme });
    const navigate = useNavigate();

    useEffect(() => {
        fetchTotals();
        fetchTotalBalance();
    }, []);

    useEffect(() => {
        if (selectedMonth) {
            fetchExpenses(selectedMonth);
        }
    }, [selectedMonth]);

    const fetchTotals = async () => {
        try {
            const response = await axios.get('https://gloma-backend.onrender.com/api/expenses/totals');
            setTotals(response.data);
        } catch (error) {
            console.error('Error fetching totals', error);
        }
    };

    const fetchTotalBalance = async () => {
        try {
            const response = await axios.get('https://gloma-backend.onrender.com/api/expenses/balance');
            setTotalBalance(response.data);
        } catch (error) {
            console.error('Error fetching total balance', error);
        }
    };

    const fetchExpenses = async (month) => {
        try {
            const response = await axios.get('https://gloma-backend.onrender.com/api/expenses', { params: { month } });
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses', error);
        }
    };

    const handleAddExpenseClick = () => {
        navigate('/formulario');
    };

    const handleAboutUsClick = () => {
        navigate('/nosotros');
    };

    const handleDeleteExpense = async (expenseId) => {
        try {
            await axios.delete(`https://gloma-backend.onrender.com/api/expenses/${expenseId}`);
            // Remove the deleted expense from the state
            setExpenses(expenses.filter(expense => expense._id !== expenseId));
        } catch (error) {
            console.error('Error deleting expense', error);
        }
    };

    const data = {
        labels: totals.map(total => total._id),
        datasets: [{
            label: 'Total Gastos',
            data: totals.map(total => total.total),
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)'
        }]
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: totals.map(total => total._id)
            }
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <h1>Tu eres primer@ ❤️</h1>
                <button className={classes.aboutUsButton} onClick={handleAboutUsClick}>
                    Sobre Nosotros
                </button>
            </div>
            <div className={classes.overview}>
                <div className={classes.row}>
                    <div className={classes.card}>
                        <FaDollarSign className={classes.icon} />
                        <h3>Balance Total de Gastos</h3>
                        <p>${totalBalance}</p>
                    </div>
                    <div className={classes.card}>
                        <FaPlusCircle className={classes.icon} />
                        <button className={classes.formButton} onClick={handleAddExpenseClick}>
                            Añadir Gasto
                        </button>
                    </div>
                </div>
                <div className={classes.row}>
                    <div className={classes.chartContainer}>
                        <ChartComponent data={data} options={options} />
                    </div>
                    <div className={classes.selectContainer}>
                        <h2>Seleccionar Mes</h2>
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            <option value="">Todos</option>
                            {totals.map((total) => (
                                <option key={total._id} value={total._id}>
                                    {total._id}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            {selectedMonth && (
                <div className={classes.listContainer}>
                    <h2>Gastos de {selectedMonth}</h2>
                    <ul>
                        {expenses.map((expense) => (
                            <li key={expense._id} style={{ display: 'flex', alignItems: 'center' }}>
                                {expense.name}: ${expense.amount}
                                <FaTrash
                                    className={classes.deleteIcon}
                                    onClick={() => handleDeleteExpense(expense._id)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

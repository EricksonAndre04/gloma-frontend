import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUseStyles, useTheme } from 'react-jss';
import rutasImage from '../assets/rutas.jpg'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

const useStyles = createUseStyles((theme) => ({
    container: {
        padding: 20,
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 20,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: 800,
        width: '100%',
        justifyContent: 'space-between'
    },
    form: {
        flex: 2, // Incrementa el tamaño del formulario
        marginRight: 20,
    },
    imageContainer: {
        textAlign: 'center',
        flex: 1, // Ajusta el tamaño del contenedor de la imagen
        maxWidth: 300,
    },
    input: {
        width: '97%',
        padding: 12,
        margin: '10px 0',
        borderRadius: 4,
        border: '1px solid #ccc',
        fontSize: 16
    },
    button: {
        padding: 12,
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontSize: 18,
        width: '100%',
        marginTop: 10
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: 8,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    subtitle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    }
}));

const Formulario = () => {
    const [expense, setExpense] = useState({ name: '', amount: '', date: '', month: '' });
    const theme = useTheme();
    const classes = useStyles({ theme });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting expense:', expense);
        try {
            const response = await axios.post('https://gloma-backend.onrender.com/api/expenses', expense);
            console.log(response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={classes.container}>
            <h2>Añadir Gasto</h2>
            <div className={classes.formContainer}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <input
                        className={classes.input}
                        type="text"
                        name="name"
                        placeholder="Nombre del Gasto"
                        value={expense.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className={classes.input}
                        type="number"
                        name="amount"
                        placeholder="Monto"
                        value={expense.amount}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className={classes.input}
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                        required
                    />
                    <select
                        className={classes.input}
                        name="month"
                        value={expense.month}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione el mes</option>
                        <option value="Enero">Enero</option>
                        <option value="Febrero">Febrero</option>
                        <option value="Marzo">Marzo</option>
                        <option value="Abril">Abril</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Junio">Junio</option>
                        <option value="Julio">Julio</option>
                        <option value="Agosto">Agosto</option>
                        <option value="Septiembre">Septiembre</option>
                        <option value="Octubre">Octubre</option>
                        <option value="Noviembre">Noviembre</option>
                        <option value="Diciembre">Diciembre</option>
                    </select>
                    <button className={classes.button} type="submit">Añadir</button>
                </form>
                <div className={classes.imageContainer}>
                    <img src={rutasImage} alt="Rutas del Perú" className={classes.image} />
                    <div className={classes.subtitle}>Rutas del Perú</div>
                </div>
            </div>
        </div>
    );
};

export default Formulario;

// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Register.css'; // Asegúrate de crear este archivo CSS

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos
        if (!username.trim() || !password.trim()) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            await axios.post('https://gloma-backend.onrender.com/api/auth/register', { username, password });
            alert('Te registraste correctamente! Ahora te redirigiremos al apartado principal!');
            navigate('/login'); // Redirige a la página de inicio de sesión
        } catch (error) {
            console.error(error);
            alert('Algo salió mal 😔, vuelva a intentarlo.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-background"></div>
            <div className="register-form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>REGISTRATE FAMILIA! 😊❤️</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Registrarme!!</button>
                </form>
            </div>
        </div>
    );
};

export default Register;

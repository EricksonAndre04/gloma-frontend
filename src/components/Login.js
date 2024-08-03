// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEye } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import './Login.css'; // Asegúrate de crear este archivo CSS
import logo from '../assets/logo.png'; // Ajusta la ruta según sea necesario

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos
        if (!username.trim() || !password.trim()) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await axios.post('https://gloma-backend.onrender.com/api/auth/login', { username, password });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/Nosotros');
        } catch (error) {
            console.error(error);
            alert('Inicio de sesión fallido. Por favor, verifica tus credenciales.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={logo} alt="Logo" />
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>INICIAR SESIÓN</h2>
                <p>Hola familia Gloma! Ingrese sus credenciales de nuestra empresa para acceder a los registros.</p>
                <input
                    type="text"
                    placeholder="Correo Empresarial"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className="password-icon" />
                    <FaEye 
                        className="show-password-icon" 
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <div className="forgot-password">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
                <button 
                    type="submit" 
                    className="login-button"
                >
                    Log in
                </button>
                <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Recuérdame</label>
                </div>
                <button type="button" className="google-login-button">
                    <FcGoogle className="google-icon" />
                    Iniciar Sesión con Google
                </button>
                <div className="register-link">
                    <span>Aun no tienes cuenta? </span>
                    <a href="/register">Regístrate AQUI!</a>
                </div>
            </form>
        </div>
    );
};

export default Login;

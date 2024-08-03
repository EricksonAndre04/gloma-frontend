import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import Expenses from './components/Expenses';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Formulario from './components/Formulario';
import Nosotros from './components/Nosotros';
import logo from './assets/logo.png';  // Importa la imagen del logo

const theme = {
    typography: {
        cardTitle: {
            fontSize: 16,
            fontWeight: 'bold'
        }
    },
    color: {
        grayishBlue: '#6c757d'
    }
};

const headerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #dee2e6',
    height: '60px'
};

const headerContentStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
};

const logoStyle = {
    width: '60px',
    marginRight: '30px'
};

const titleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0'
};

const buttonStyle = {
    backgroundColor: '#f4ad79',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginLeft: 'auto'  // Esto hará que el botón se alinee al extremo derecho
};

const buttonHoverStyle = {
    backgroundColor: '#0056b3'
};

const Header = ({ onLogout }) => (
    <header style={headerStyle}>
        <div style={headerContentStyle}>
            <img src={logo} alt="Logo" style={logoStyle} />
            <h1 style={titleStyle}>Dashboard GLOMA</h1>
            <button
                onClick={onLogout}
                style={buttonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            >
                Cerrar Sesión
            </button>
        </div>
    </header>
);

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <Routes>
                        {token ? (
                            <>
                                <Route path="/dashboard" element={
                                    <>
                                        <Header onLogout={handleLogout} />
                                        <Dashboard token={token} />
                                    </>
                                } />
                                <Route path="/formulario" element={
                                    <>
                                        <Header onLogout={handleLogout} />
                                        <Formulario token={token} />
                                    </>
                                } />
                                <Route path="/nosotros" element={<Nosotros />} />
                                <Route path="*" element={<Navigate to="/dashboard" />} />
                            </>
                        ) : (
                            <>
                                <Route path="/login" element={
                                    <Login setToken={(token) => {
                                        setToken(token);
                                        localStorage.setItem('token', token);
                                    }} />
                                } />
                                <Route path="/register" element={<Register />} />
                                <Route path="*" element={<Navigate to="/login" />} />
                            </>
                        )}
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;

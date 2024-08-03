import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import nosotrosImage from '../assets/Nosotros.jpg';
import logo from '../assets/logo.png';

const useStyles = createUseStyles({
    container: {
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 1200,
        alignItems: 'center',
        padding: '20px 20px',
        boxSizing: 'border-box',
    },
    logo: {
        height: 80, // Aumenta el tamaño del logo
        marginRight: 20,
    },
    navLinks: {
        display: 'flex',
        gap: 20,
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: '#000',
        fontSize: 20, // Aumenta el tamaño de la fuente para los enlaces
        fontFamily: '"Comic Sans MS", cursive', // Cambia la fuente a Comic Sans MS (cursiva)
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    buttons: {
        display: 'flex',
        gap: 10,
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: 4,
        backgroundColor: '#f4ad79',
        color: '#fff',
        cursor: 'pointer',
        textDecoration: 'none',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: '"Comic Sans MS", cursive',
    },
    mainContent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
        padding: '0 20px',
        boxSizing: 'border-box',
    },
    content: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '100%',
    },
    textContent: {
        width: '50%',
        paddingRight: 20,
        fontFamily: '"Comic Sans MS", cursive', // Cambia la fuente a Comic Sans MS (cursiva)
        fontSize: 20, // Aumenta el tamaño de la fuente
        lineHeight: 1.5, // Ajusta el interlineado para mejor legibilidad
    },
    imageContent: {
        width: '40%',
    },
    image: {
        width: '100%',
        borderRadius: 8,
    }
});

const Nosotros = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <img src={logo} alt="Logo" className={classes.logo} />
                <div className={classes.navLinks}>
                    <a href="#tools" className={classes.link}>Tools</a>
                    <a href="#channels" className={classes.link}>Channels</a>
                    <a href="#pricing" className={classes.link}>Pricing</a>
                    <a href="#blog" className={classes.link}>Blog</a>
                </div>
                <div className={classes.buttons}>
                    
                    <button className={classes.button} onClick={() => navigate('/dashboard')}>Dashboard</button>
                </div>
            </div>
            <div className={classes.mainContent}>
                <div className={classes.content}>
                    <div className={classes.textContent}>
                        <h1>Hola! <br /> Familia Gloma <span role="img" aria-label="smile">😊</span></h1>
                        <p>
                            Nuestra Misión es brindar un servicio de transporte de carga pesada que se caracterice por ser de calidad, garantizando puntualidad y cumpliendo los requisitos de nuestros clientes, con una flota de unidades en óptimas condiciones y un personal capacitado.
                        </p>
                        <p>
                            Nuestra Visión es ser una empresa líder en el rubro de transportes de carga pesada a nivel nacional, estableciendo alianzas con las principales empresas del mercado, brindando un servicio eficiente y de calidad, con el compromiso de apoyar en la formación integral de nuestros colaboradores.
                        </p>
                    </div>
                    <div className={classes.imageContent}>
                        <img src={nosotrosImage} alt="Nosotros" className={classes.image} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nosotros;

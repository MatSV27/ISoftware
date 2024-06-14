import React from "react";
import {useNavigate } from 'react-router-dom';
import "./loginSistema.css";
import sanFelipeLogo from './img/SAN FELIPE.png';

export default function MenuPrincipal(){
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div className="container">
                <div className="left">
                    <button onClick={() => handleNavigation('/generarTicket')}>Generar Ticket</button>
                    <button onClick={() => handleNavigation('/visualizarTicket')}>Visualizar Ticket</button>
                    <button onClick={() => handleNavigation('/ticketSinAsignar')}>Tickets sin asignar</button>
                    <button onClick={() => handleNavigation('/administrarUsuarios')}>Administrar Usuarios</button>
                    <button style={{backgroundColor: 'red'}} onClick={() => { localStorage.removeItem('authToken'); navigate('/login'); }}>Salir</button>
                </div>
                <div className="right">
                    <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                </div>
            </div>
        </div>
    )
}
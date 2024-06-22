import React from "react";
import {useNavigate } from 'react-router-dom';
import "./menuPrincipal.css";
import sanFelipeLogo from './img/SAN FELIPE.png';

export default function MenuPrincipal(){
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <header className="headerMenu">
                <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                <h1>Mesa de Ayuda</h1>
            </header>
            <div className="containerMenu">
                <div className="leftMenu">
                    <button className="buttonMenu" onClick={() => handleNavigation('/generarTicket')}>Generar Ticket</button>
                    <button className="buttonMenu" onClick={() => handleNavigation('/ticket')}>Visualizar Ticket</button>
                    {/* <button className="buttonMenu" onClick={() => handleNavigation('/ticketSinAsignar')}>Tickets sin asignar</button> */}
                    <button className="buttonMenu" onClick={() => handleNavigation('/administrarUsuarios')}>Administrar Usuarios</button>
                    <button className="buttonMenu" style={{backgroundColor: 'red'}} onClick={() => { localStorage.removeItem('authToken'); navigate('/login'); }}>Salir</button>
                </div>
                <div className="rightMenu">
                    <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./modificarUsuario.css";

import sanFelipeLogo from './img/SAN FELIPE.png';

export default function ModificarUsuario() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/mostrar-lista-usuarios")
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched from backend:', data);  // Debug: Mostrar datos en la consola
                if (data.listaUsuarios) {
                    setUsers(data.listaUsuarios);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const getRoleText = (role) => {
        switch(role) {
            case 1:
                return 'Administrador';
            default:
                return 'Usuario';
        }
    };

    return (
        <div>
            <header>
                <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                <h1>Modificar Usuarios</h1>
            </header>
            <div className="container">

                {users.map((user) => (
                    <div className="section">
                        <div className="user">
                            <h2>Nombre de Usuario: {user.username}</h2>
                            <p>Rol: {getRoleText(user.rol)}</p>
                            <button onClick={() => navigate(`/modificarUsuario/${user.idusuario}`)}>Modificar</button>
                        </div>
                    </div>
                        ))}
            </div>
            
            <button class="back-btn" onClick={() => navigate('..')}>Volver</button>
        </div>

    );
}
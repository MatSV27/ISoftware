import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import "./administrarUsuarios.css";
import sanFelipeLogo from './img/SAN FELIPE.png';

export default function AdministrarUsuarios(){
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

    const handleNavigation = (path) => {
        navigate(path);
    };

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
            <header className="headerMenu">
                <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                <h1>Administrar Usuarios</h1>
            </header>
            <div class="containerAdministrar">
                <div class="leftAdministrar">
                    <button className="buttonAdministrar" onClick={() => navigate('..')}>Agregar Usuario</button>
                    <button className="buttonAdministrar" onClick={() => navigate('/modificarUsuario')}>Modificar Usuario</button>
                    <button className="buttonAdministrar" onClick={() => navigate('/deleteUsers')}>Eliminar Usuario</button>
                    <button className="buttonAdministrar Return" onClick={() => navigate('..')}>Volver</button>
                </div>
                <div class="rightAdministrar">
                    <h2>Lista de Usuarios</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr className="section">
                                <td>{user.idusuario}</td>
                                <td>{user.nombre}</td>
                                <td>{user.correo}</td>
                                <td>{getRoleText(user.rol)}</td>
                            </tr>
                                ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
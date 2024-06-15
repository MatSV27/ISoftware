import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "./formModUsuario.css";

import sanFelipeLogo from './img/SAN FELIPE.png';

export default function FormModUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user', // Valor por defecto para el select
    });

    useEffect(() => {
        fetch(`http://localhost:4000/obtener-usuario/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log('Datos del usuario obtenidos:', data);
                // Actualizar el estado del formulario con los datos del usuario
                setFormData({
                    username: data.username,
                    email: data.correo,
                    password: data.contrasena,
                    role: data.rol.toString(), // Convertir el rol a string
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const { username, email, password, role } = formData;
    
        fetch(`http://localhost:4000/actualizar-usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                contrasena: password, 
                rol: parseInt(role), 
                idusuario: `${id}`
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            navigate('/modificarUsuario');
        })
        .catch(error => {
            console.error('Error al actualizar usuario:', error);
        });
    };


    return (
        <div>
            <header>
                <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                <h1>Modificar Usuarios</h1>
            </header>
            <div className="container1">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Nombre de Usuario:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />

                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

                    <label htmlFor="role">Rango:</label>
                    <select id="role" name="role" value={formData.role} onChange={handleInputChange} required>
                        <option value="1">Administrador</option>
                        <option value="2">Usuario</option>
                    </select>

                    <div className="button-group">
                        <button className="butForm" type="submit">Guardar</button>
                        <button className="butFormVol" type="submit" onClick={() => navigate('/modificarUsuario')}>Volver</button>
                    </div>
                </form>
            </div>
        </div>
            
        </div>

    );
}
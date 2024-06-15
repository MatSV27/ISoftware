import React, {useState} from "react";
import {useNavigate } from 'react-router-dom';
import "./loginSistema.css";
import sanFelipeLogo from './img/SAN FELIPE.png';

export default function LoginSistema(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username:'',
        contrasena:'',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,[e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setErrorMessage(data.error);
                console.log(formData);
            } else {
                localStorage.setItem('authToken', data.token);
                navigate('/');  
            }
        })
        .catch(error => {
            console.error('Error al autenticar:', error);
            setErrorMessage('Error al autenticar. Por favor, inténtalo de nuevo.');
        });
    };
    return (
        <div className="bodyLogin">
            <div className="containerLogin">
                <div className="leftLogin">
                    <img src={sanFelipeLogo} alt="Clínica San Felipe"/>
                </div>
                <div className="rightLogin">
                    <h2>Inicie Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Usuario</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />
                        
                        <label htmlFor="contrasena">Contraseña</label>
                        <input type="password" id="contrasena" name="contrasena" value={formData.contrasena} onChange={handleInputChange} required />
                        
                        <button className="buttonLogin" type="submit">Ingresar</button>
                    </form>
                </div>
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    )
}
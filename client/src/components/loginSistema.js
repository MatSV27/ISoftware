import React, {useState} from "react";
import {useNavigate } from 'react-router-dom';
import "./loginSistema.css";
import sanFelipeLogo from './img/SAN FELIPE.png';

export default function LoginSistema(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username:'',
        password:'',
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
            } else {
                localStorage.setItem('authToken', data.token);
                // Puedes almacenar el usuario en el estado global o en localStorage
                // localStorage.setItem('usuario', JSON.stringify(data.usuario));
                navigate('/'); // Redirigir a la página principal u otra página después del login 
            }
        })
        .catch(error => {
            console.error('Error al autenticar:', error);
            setErrorMessage('Error al autenticar. Por favor, inténtalo de nuevo.');
        });
    };
    return (
        <div>
            <div className="container">
                <div className="left">
                    <img src={sanFelipeLogo} alt="Clínica San Felipe"/>
                </div>
                <div className="right">
                    <h2>Inicie Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Usuario</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />
                        
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                        
                        <button type="submit">Ingresar</button>
                    </form>
                </div>
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    )
}
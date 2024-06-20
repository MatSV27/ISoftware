import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './generarTicket.css';

const GenerarTicket = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        descripcion: 'Se está generando ticket para .....',
        urgencia: '3',
        informacion: 'Aparte del ticket, este debe ser .....',
        especialista: 'Cristian Mejía Uribe',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/tickets', formData);
            console.log('Ticket creado:', response.data);
            navigate('/tickets');
        } catch (error) {
            console.error('Error al crear el ticket:', error);
            setErrorMessage('Error al crear el ticket. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div>
            <header>
                <img src="SAN FELIPE.png" alt="Clínica San Felipe" />
                <h1>Generar Ticket de soporte</h1>
            </header>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="descripcion">Descripción del ticket</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                    ></textarea>

                    <label htmlFor="urgencia">Prioridad</label>
                    <input
                        type="number"
                        id="urgencia"
                        name="urgencia"
                        value={formData.urgencia}
                        min="1"
                        max="5"
                        onChange={handleChange}
                    />

                    <label htmlFor="informacion">Información adicional</label>
                    <textarea
                        id="informacion"
                        name="informacion"
                        value={formData.informacion}
                        onChange={handleChange}
                    ></textarea>

                    <label htmlFor="especialista">Especialista</label>
                    <input
                        type="text"
                        id="especialista"
                        name="especialista"
                        value={formData.especialista}
                        onChange={handleChange}
                    />

                    <div className="buttons">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={() => navigate('/MenuPrincipal')}>Regresar</button>
                    </div>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default GenerarTicket;

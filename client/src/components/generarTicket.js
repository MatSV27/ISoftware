import React, { useState } from 'react';
import axios from 'axios';
import './generarTicket.css';

const GenerarTicket = () => {
    const [formData, setFormData] = useState({
        descripcion: '',
        urgencia: '3', // Valor por defecto, puedes cambiar según prefieras
        idEquipoTec: '', // Aquí debes establecer el ID del equipo técnico seleccionado
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
            // Aquí podrías redirigir a la página de detalles del ticket creado, por ejemplo:
            // history.push(`/ticket/${response.data.idTicket}`);
            setFormData({
                descripcion: '',
                urgencia: '3',
                idEquipoTec: '',
            });
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

                    <label htmlFor="idEquipoTec">Especialista</label>
                    <input
                        type="text"
                        id="idEquipoTec"
                        name="idEquipoTec"
                        value={formData.idEquipoTec}
                        onChange={handleChange}
                    />

                    <div className="buttons">
                        <button type="submit">Guardar</button>
                        {/* Puedes redirigir a cualquier otra página después de crear el ticket */}
                        <button type="button" onClick={() => window.location.href = '/MenuPrincipal'}>
                            Regresar
                        </button>
                    </div>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default GenerarTicket;

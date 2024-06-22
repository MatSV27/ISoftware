import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './generarTicket.css';

import sanFelipeLogo from './img/SAN FELIPE.png';


const GenerarTicket = () => {
    const [formData, setFormData] = useState({
        descripcion: '',
        urgencia: '3', // Valor por defecto, puedes cambiar según prefieras
        idEquipoTec: '', // Aquí debes establecer el ID del equipo técnico seleccionado
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [equiposTecnicos, setEquiposTecnicos] = useState([]);

    useEffect(() => {
        const fetchEquiposTecnicos = async () => {
            try {
                const response = await axios.get('http://localhost:4000/equiptec');
                setEquiposTecnicos(response.data);
            } catch (error) {
                console.error('Error al obtener los equipos técnicos:', error);
            }
        };

        fetchEquiposTecnicos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.idEquipoTec === '') {
            setErrorMessage('Por favor, seleccione un especialista.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/add-ticket', formData);
            console.log('Ticket creado:', response.data);
            // Aquí podrías redirigir a la página de detalles del ticket creado, por ejemplo:
            // history.push(`/ticket/${response.data.idTicket}`);
            setFormData({
                descripcion: '',
                urgencia: '3',
                idEquipoTec: '',
            });
        } catch (error) {
            console.log(formData);
            console.error('Error al crear el ticket:', error);
            setErrorMessage('Error al crear el ticket. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className='bodyGen'>
            <header className='headerGen'>
                <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                <h1>Generar Ticket de soporte</h1>
            </header>
            <div className="form-containerGen">
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

<label htmlFor="idEquipoTec">Especialidad</label>
                    <select
                        id="idEquipoTec"
                        name="idEquipoTec"
                        value={formData.idEquipoTec}
                        onChange={handleChange}
                    >
                        <option value="">Seleccionar</option>
                        {equiposTecnicos.map((equipo) => (
                            <option key={equipo.idequipotec} value={equipo.idequipotec}>
                                {equipo.areaespecialidad}
                            </option>
                        ))}
                    </select>

                    <div className="buttons">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={() => window.location.href = '/'}>
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

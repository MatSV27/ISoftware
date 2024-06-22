import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TicketDetails.css';
import sanFelipeLogo from './img/SAN FELIPE.png';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    descripcion: '',
    prioridad: '',
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/ticket/${id}`);
        setTicket(response.data);
        setFormData({
          descripcion: response.data.descripcion,
          prioridad: response.data.prioridad,
        });
      } catch (error) {
        console.error('Error al obtener los detalles del ticket:', error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/ticket/${id}`, formData);
      setTicket(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el ticket:', error);
    }
  };

  const formatDate = (isoString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return new Date(isoString).toLocaleString(undefined, options).replace(',', '');
  };

  if (!ticket) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <header>
                <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                <h1>Ticket #{ticket.idticket}</h1>
      </header>
    <div className="ticket-details">
      <h1>{ticket.idticket}</h1>
      <div className="details-container">
        <div className="details-row">
          <div className="details-label">Descripción del Ticket</div>
          {isEditing ? (
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          ) : (
            <div className="details-value">{ticket.descripcion}</div>
          )}
        </div>
        <div className="details-row">
          <div className="details-label">Prioridad</div>
          {isEditing ? (
            <select
            name="urgencia"
            value={formData.prioridad}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          ) : (
            <div className="details-value">{ticket.urgencia}</div>
          )}
        </div>
        <div className="details-row">
          <div className="details-label">Fecha de creación</div>
          <div className="details-value">{formatDate(ticket.fechahora)}</div>
        </div>
        {isEditing ? (
          <div className="details-buttons">
            <button onClick={handleSave}>Guardar</button>
            <button className='cancel-button' onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        ) : (
          <div className="details-buttons">
            <button onClick={() => navigate(`/ticketDiscusion/${id}`)}>Interactuar con Ayudante de Mesa</button>
            <button onClick={() => setIsEditing(true)}>Modificar</button>
          </div>
        )}
        <Link to="/ticket"><button className='link-button' >Regresar</button></Link>
      </div>
    </div></div>
  );
};

export default TicketDetails;


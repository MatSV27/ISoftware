import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TicketList.css';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:4000/ticket');
        setTickets(response.data);
      } catch (error) {
        console.error('Error al obtener los tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="ticket-list">
      <h1>Lista de tickets</h1>
      <div className="ticket-container">
        {tickets.map((ticket) => (
          <div key={ticket.idticket} className="ticket">
            <h2>{ticket.idticket}</h2>
            <p><strong>Descripción:</strong> {ticket.descripcion}</p>
            <p><strong>Prioridad:</strong> {ticket.urgencia}</p>
            <Link to={`/ticket/${ticket.idticket}`}><button>Detalles</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;

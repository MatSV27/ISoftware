import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TicketList.css';
import sanFelipeLogo from './img/SAN FELIPE.png';

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
    <div>
      <header>
                <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                <h1>Lista de Tickets</h1>
      </header>
    <div className="ticket-list">
      <div className="ticket-container">
        {tickets.map((ticket) => (
          <div key={ticket.idticket} className="ticket">
            <h2>Ticket #{ticket.idticket}</h2>
            <p><strong>Descripción:</strong></p> 
            <p> {ticket.descripcion}</p>
            <p><strong>Prioridad:</strong></p> 
            <p> {ticket.urgencia}</p>
            <Link to={`/ticket/${ticket.idticket}`}><button>Detalles</button></Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TicketList;

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './discusionTicket.css';

import sanFelipeLogo from './img/SAN FELIPE.png';


export default function DiscusionTicket () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');


  useEffect(() => {
    const fetchTicket = async () => {
        try {
            const ticketResponse = await axios.get(`http://localhost:4000/ticket/${id}`);
            setTicket(ticketResponse.data);
        } catch (error) {
            console.error('Error fetching ticket data:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const messagesResponse = await axios.get(`http://localhost:4000/mssg-ticket/${id}`);
            setMessages(messagesResponse.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    fetchTicket();
    fetchMessages();
  }, [id]);

  const getRoleText = (role) => {
    switch(role) {
        case 2:
            return 'Administrador';
        default:
            return 'Usuario';
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
    <div className='bodyDisc'>
    <div className="containerDisc">
        <div className='headerDisc'>
            <img src={sanFelipeLogo} alt="Clínica San Felipe" />
            <h1>Ticket #{ticket.idticket} - Discusión</h1>
        </div>
        <div className="contentDisc">
            <div className="info-adicional">
                <h3>Información adicional</h3>
                <div id="info" name="info" rows="2" cols="50">{ticket.descripcion}</div>

                <h3  for="id-emisor">ID emisor</h3>
                <div type="text" id="id-emisor" name="id-emisor" >{ticket.idcliente}</div>

                <h3 for="fecha-creacion">Fecha de creación</h3>
                <div type="date" id="fecha-creacion" name="fecha-creacion" >{formatDate(ticket.fechahora)}</div>
            </div>
            <div className="mensajes">
                <h3>Mensajes</h3>
                {messages.map((mensaje) => (
                        <div className="mensaje" data-id={mensaje.idMensaje} key={mensaje.idMensaje}>
                            <div className="mensaje-header">
                                <span className="usuario">{mensaje.nombre} - </span>
                                <span className='rol'>{getRoleText(mensaje.rol)}</span>
                            </div>
                            <div className="mensaje-body">
                                <p>{mensaje.contenidomensaje}</p>
                                <span className="fecha">{mensaje.fechaHora}</span>
                            </div>
                        </div>
                    ))}
                <div className="nuevo-mensaje">
                    <label for="nuevo-mensaje">Escribe un mensaje...</label>
                    <textarea className='textareaDisc' id="nuevo-mensaje" name="nuevo-mensaje" rows="3" cols="50"></textarea>
                    <button className='buttonDisc' onclick="enviarMensaje()">Enviar</button>
                </div>
            </div>
        </div>
        <button className='buttonDisc' onClick={() => navigate(`/ticket/${id}`)}>Regresar</button>
    </div>
    </div>
  );
};




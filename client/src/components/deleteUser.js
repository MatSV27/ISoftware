import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeleteUser.css";

import sanFelipeLogo from './img/SAN FELIPE.png';

export default function DeleteUser() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);

    useEffect(() => {
        fetch("http://localhost:4000/mostrar-lista-usuarios")
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched from backend:', data);  // Debug: Mostrar datos en la consola
                if (data.listaUsuarios) {
                    setUsers(data.listaUsuarios);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:4000/eliminar-usuario/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message) {
                // Actualizar la lista de usuarios en el estado después de eliminar
                setUsers(users.filter(user => user.idusuario !== id));
            } else {
                console.error('Error deleting user:', data.error);
            }
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    };

    const showConfirmation = (id) => {
        setConfirmDelete(id);
    };

    const hideConfirmation = () => {
        setConfirmDelete(null);
    };

    const getRoleText = (role) => {
        switch(role) {
            case 1:
                return 'Administrador';
            default:
                return 'Usuario';
        }
    };

    return (
    <div>
        <header className="header">
            <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                <h1>Lista de Usuarios</h1>
                <button className="return" onClick={() => navigate('..')}>Regresar</button>
            </header>
        <div className="containerDelete">
        <ul className="listDel">

        {users.map((user) => (
                        <li key={user.idusuario} className="itemDel">
                            <h2>Usuario #{user.idusuario}</h2>
                            <div className="detailsDel">
                                <h3>Username</h3>
                                <p>{user.username}</p>
                            </div>
                            <div className="detailsDel">
                                <h3>Rango</h3>
                                <p>{getRoleText(user.rol)}</p>
                            </div>
                            <button 
                                className={`butDelete ${confirmDelete === user.idusuario ? 'hiddenDel' : ''}`} 
                                onClick={() => showConfirmation(user.idusuario)}
                            >
                                Eliminar
                            </button>
                            <div className={`confirmationButtons ${confirmDelete === user.idusuario ? '' : 'hiddenDel'}`}>
                                <button className="confirmYes" onClick={() => handleDelete(user.idusuario)}>¿Estás seguro?</button>
                                <button className="confirmNo" onClick={hideConfirmation}>No</button>
                            </div>
                        </li>
                    ))}
        </ul>
    </div>
    </div>

    );
}
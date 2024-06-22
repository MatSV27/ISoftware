import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./agregarusuarios.css";
import axios from 'axios';
import sanFelipeLogo from '../img/SAN FELIPE.png';

const AgregarUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombre: '',
        correo: '',
        documentoidentidad: '',
        contrasena: '',
        rol: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/crear-usuario', usuario);
            console.log(response.data);
            // Manejo después del envío exitoso, por ejemplo, redirigir o limpiar el formulario
            navigate('/administrarUsuarios');
        } catch (error) {
            console.error('Error al crear usuario:', error);
        }
    };

/*     const navigate = useNavigate();
// después de la creación exitosa
navigate('/administrarUsuarios'); */

    return (
        <div>
            <header className="headerMenu">
                <img src={sanFelipeLogo} alt="Clínica San Felipe" />
                <h1>Crear Usuario</h1>
            </header>
        <div className="containerAgregar p-5">
            
            <div className="row p-3">
                <div className="col-md-4 mx-auto">
                    <div className="card">
                        <div className="card-header text-center">
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                {/* Campos del formulario */}
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        placeholder="Nombre"
                                        className="form-control"
                                        value={usuario.nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        className="form-control"
                                        value={usuario.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="correo"
                                        id="correo"
                                        placeholder="Correo"
                                        className="form-control"
                                        value={usuario.correo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="documentoidentidad"
                                        id="documentoidentidad"
                                        placeholder="DNI"
                                        className="form-control"
                                        value={usuario.documentoidentidad}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="contrasena"
                                        id="contrasena"
                                        placeholder="Contraseña"
                                        className="form-control"
                                        value={usuario.contrasena}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        name="rol"
                                        id="rol"
                                        className="form-control"
                                        value={usuario.rol}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Selecciona un rol</option>
                                        <option value="2">Usuario</option>
                                        <option value="1">Administrador</option>
                                    </select>

                                </div>
                                {/* Repetir la estructura para otros campos */}
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-success btn-block">
                                        Crear Usuario
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div></div>
    );
};

export default AgregarUsuario;
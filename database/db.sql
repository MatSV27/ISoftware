CREATE DATABASE clinicadb

CREATE TABLE USUARIO (
    idUsuario VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100),
    documentoIdentidad VARCHAR(8),
    correo VARCHAR(20),
    contrasena VARCHAR(20),
    fechaIngreso TIMESTAMP,
    estado INT,
    rol INT
);

CREATE TABLE CLIENTE (
    idCliente VARCHAR(20) PRIMARY KEY,
    idUsuario VARCHAR(20) REFERENCES USUARIO(idUsuario),
    areaTrabajo VARCHAR(100)
);

CREATE TABLE ADMINISTRADOR (
    idAdmin VARCHAR(20) PRIMARY KEY,
    idUsuario VARCHAR(20) REFERENCES USUARIO(idUsuario)
);

CREATE TABLE ESPECIALISTA (
    idEspecialista VARCHAR(20) PRIMARY KEY,
    idUsuario VARCHAR(20) REFERENCES USUARIO(idUsuario),
    idEquipoTec VARCHAR(20),
    horaInicioLab TIME,
    horaFinLab TIME
);

CREATE TABLE EQUIPOTECNICO (
    idEquipoTec VARCHAR(20) PRIMARY KEY,
    areaEspecialidad VARCHAR(50),
    descripcion VARCHAR(100)
);

CREATE TABLE TICKET (
    idTicket VARCHAR(20) PRIMARY KEY,
    idCliente VARCHAR(20) REFERENCES CLIENTE(idCliente),
    idEquipoTec VARCHAR(20) REFERENCES EQUIPOTECNICO(idEquipoTec),
    descripcion VARCHAR(100),
    fechaHora TIMESTAMP,
    estado INT,
    urgencia INT
);

CREATE TABLE MENSAJE (
    idMensaje VARCHAR(20) PRIMARY KEY,
    idUsuario VARCHAR(20) REFERENCES USUARIO(idUsuario),
    idTicket VARCHAR(20) REFERENCES TICKET(idTicket),
    fechaHora TIMESTAMP,
    contenidoMensaje VARCHAR(200)
);

CREATE TABLE ASIGNACION (
    idAsignacion VARCHAR(20) PRIMARY KEY,
    idTicket VARCHAR(20) REFERENCES TICKET(idTicket),
    idEspecialista VARCHAR(20) REFERENCES ESPECIALISTA(idEspecialista),
    fecha DATE,
    horaInicio TIME,
    horaFinEstimado TIME,
    horaFinReal TIME,
    estado INT
);

ALTER TABLE USUARIO ADD COLUMN username VARCHAR(50);
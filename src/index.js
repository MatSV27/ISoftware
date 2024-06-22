const express = require('express');
const morgan = require('morgan');
//Solicitud desde cualquier fuente
const cors = require('cors');

const clinicaroutes = require('./routes/clinica.routes');
const usuariosroutes = require('./routes/usuarios.routes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(clinicaroutes);
app.use(usuariosroutes);


app.listen(4000)
console.log('Server on port 4000')
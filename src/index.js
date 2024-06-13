const express = require('express');
const morgan = require('morgan');

const clinicaroutes = require('./routes/clinica.routes');
const app = express();

app.use(morgan('dev'));
app.use(clinicaroutes);


app.listen(4000)
console.log('Server on port 4000')
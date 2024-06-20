const pool = require('../db')

const getAllTickets = async (req,res) =>{
    try {
        const result = await pool.query('SELECT * FROM ticket')
        res.json(result.rows)
    } catch (error) {
        console.log(error.message)
    }
    

}

const getSpecificTicket =  async (req,res) =>{
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM ticket WHERE idticket = $1', [id]);
        res.json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
}

const addTicket = async (req, res) => {
    const { descripcion, urgencia, idEquipoTec } = req.body;
    const fechaHora = new Date(); // Fecha y hora actual del servidor

    try {
        // Insertar el nuevo ticket en la base de datos
        const result = await pool.query(
            'INSERT INTO ticket (idTicket, descripcion, urgencia, idEquipoTec, fechaHora, estado) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING *',
            [descripcion, urgencia, idEquipoTec, fechaHora, 1] // Estado inicial del ticket (ejemplo: 1)
        );
        res.status(201).json(result.rows[0]); // Devolver el ticket creado como respuesta
    } catch (error) {
        console.error('Error al generar el ticket:', error);
        res.status(500).send('Error del servidor al generar el ticket');
    }
};

const deleteTicket = (req,res) =>{
    res.send('Deleting a list of tasks');
}

const modifyTicket =  async(req,res) =>{
    const {id} = req.params;
    const { descripcion, urgencia } = req.body;
    if (![1, 2, 3, 4, 5].includes(Number(urgencia))) {
        return res.status(400).send('La prioridad debe estar entre 1 y 5');
      }
      
    console.log(id, descripcion, urgencia)

    const result = await pool.query('UPDATE ticket SET descripcion = $1, urgencia = $2 WHERE idticket = $3',
        [descripcion, urgencia, id]
    );

    console.log(result)
    res.send('Updating a list of tasks');
}


module.exports = {
    getAllTickets,
    getSpecificTicket,
    addTicket,
    deleteTicket,
    modifyTicket
}

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
    const { idCliente, idEquipoTec, descripcion, urgencia } = req.body;
    const fechaHora = new Date();

    try {
        const result = await pool.query(
            'INSERT INTO ticket (idticket, idCliente, idEquipoTec, descripcion, fechaHora, estado, urgencia) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [generateId(), idCliente, idEquipoTec, descripcion, fechaHora, 1, urgencia] // Estado inicial 1
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error al crear el ticket');
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

const generateId = () => {
    return 'TICKET_' + Math.random().toString(36).substr(2, 9);
};

module.exports = {
    getAllTickets,
    getSpecificTicket,
    addTicket,
    deleteTicket,
    modifyTicket
}

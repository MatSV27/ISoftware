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

const addTicket = (req,res) =>{
    res.send('Creating a list of tasks');
}

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

const getMssgTickets = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT 
                m.idMensaje, 
                m.contenidoMensaje, 
                u.nombre, 
                u.rol,
                m.fechaHora
            FROM 
                MENSAJE m
            JOIN 
                USUARIO u ON m.idUsuario = u.idUsuario
            JOIN 
                TICKET t ON m.idTicket = t.idTicket
            WHERE 
                t.idTicket = $1
            ORDER BY 
                m.fechaHora ASC;
        `;
        const result = await pool.query(query, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
}


module.exports = {
    getAllTickets,
    getSpecificTicket,
    addTicket,
    deleteTicket,
    modifyTicket,
    getMssgTickets
}
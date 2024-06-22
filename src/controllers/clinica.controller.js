const pool = require('../db')

const getAllTickets = async (req,res) =>{
    try {
        const result = await pool.query('SELECT * FROM ticket order by idticket')
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
            `INSERT INTO ticket (idTicket, descripcion, urgencia, idEquipoTec, fechaHora, estado) VALUES ('T002', $1, $2, $3, $4, $5) RETURNING *`,
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

const getEquiposTecnicos = async (req, res) => {
    try {
        const query = `
            SELECT 
                idEquipoTec, 
                areaEspecialidad 
            FROM 
                EQUIPOTECNICO;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
} 

const insertarMensaje = async (req, res) => {
    try {
        const { idticket, contenidomensaje } = req.body;

        const query = "INSERT INTO mensaje (idmensaje,idusuario,idticket, contenidomensaje, fechahora) VALUES ('M010',2,$1, $2, CURRENT_TIMESTAMP) RETURNING *";
        const values = [idticket, contenidomensaje];

        const result = await pool.query(query, values);

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al insertar mensaje:', error);
        res.status(500).send('Error al insertar mensaje');
    }
};


module.exports = {
    getAllTickets,
    getSpecificTicket,
    addTicket,
    deleteTicket,
    modifyTicket,
    getMssgTickets,
    getEquiposTecnicos,
    insertarMensaje
}

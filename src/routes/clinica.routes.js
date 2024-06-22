const {Router} = require('express')
const {getAllTickets, 
    getSpecificTicket, 
    addTicket, 
    deleteTicket, 
    modifyTicket,
    getMssgTickets,
    getEquiposTecnicos,
    insertarMensaje } = require('../controllers/clinica.controller')
const router = Router();

router.get('/ticket', getAllTickets)

router.get('/ticket/:id', getSpecificTicket)

router.get('/mssg-ticket/:id', getMssgTickets)

router.get('/equiptec', getEquiposTecnicos)

router.post('/add-ticket', addTicket)
router.post('/mensaje', insertarMensaje)

router.delete('/delete-ticket', deleteTicket)

router.put('/ticket/:id', modifyTicket)

module.exports = router;
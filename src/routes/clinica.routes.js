const {Router} = require('express')
const {getAllTickets, getSpecificTicket, addTicket, deleteTicket, modifyTicket} = require('../controllers/clinica.controller')
const router = Router();

router.get('/tasks', getAllTickets)

router.get('/tasks/10', getSpecificTicket)

router.post('/tasks', addTicket)

router.delete('/tasks', deleteTicket)

router.put('/tasks', modifyTicket)

module.exports = router;
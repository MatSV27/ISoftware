const {Router} = require('express')
const {getAllTickets, 
    getSpecificTicket, 
    addTicket, 
    deleteTicket, 
    modifyTicket,
    getMssgTickets} = require('../controllers/clinica.controller')
const router = Router();

router.get('/ticket', getAllTickets)

router.get('/ticket/:id', getSpecificTicket)

router.get('/mssg-ticket/:id', getMssgTickets)

router.post('/add-ticket', addTicket)

router.delete('/delete-ticket', deleteTicket)

router.put('/ticket/:id', modifyTicket)

module.exports = router;
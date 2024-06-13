const getAllTickets = (req,res) =>{
    res.send('Retrieving a single task');
}

const getSpecificTicket =  (req,res) =>{
    res.send('Retrieving a single task');
}

const addTicket = (req,res) =>{
    res.send('Creating a list of tasks');
}

const deleteTicket = (req,res) =>{
    res.send('Deleting a list of tasks');
}

const modifyTicket = (req,res) =>{
    res.send('Updating a list of tasks');
}

module.exports = {
    getAllTickets,
    getSpecificTicket,
    addTicket,
    deleteTicket,
    modifyTicket
}
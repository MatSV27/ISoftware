import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DeleteUser from './components/deleteUser';
import ModificarUsuario from './components/modificarUsuario';
import FormModUsuario from './components/formModUsuario'
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/deleteUsers" element= {<DeleteUser />} />
        <Route path="/modificarUsuario" element= {<ModificarUsuario />} />
        <Route path="/modificarUsuario/:id" element= {<FormModUsuario />} />

        <Route path="/" element={<TicketList />} />
        <Route path="/ticket/:id" element={<TicketDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

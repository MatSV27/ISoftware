import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import DeleteUser from './components/deleteUser';
import ModificarUsuario from './components/modificarUsuario';
import FormModUsuario from './components/formModUsuario'
import LoginSistema from './components/loginSistema';
import MenuPrincipal from './components/menuPrincipal';
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';
import GenerarTicket from './components/generarTicket';
import AdministrarUsuarios from './components/administrarUsuarios';
import DiscusionTicket from './components/discusionTicket';
import AgregarUsuario from './components/agregarusuarios/agregarusuarios'



function App() {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Simulación de autenticación

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginSistema />} />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<MenuPrincipal />} />
            <Route path="/deleteUsers" element={<DeleteUser />} />
            <Route path="/modificarUsuario" element={<ModificarUsuario />} />
            <Route path="/modificarUsuario/:id" element={<FormModUsuario />} />
            <Route path="/administrarUsuarios" element={<AdministrarUsuarios />}/>
            <Route path="/agregarusuarios" element={<AgregarUsuario />}/>
            <Route path="/ticket" element={<TicketList />} />
            <Route path="/generarTicket" element={<GenerarTicket />} />
            <Route path="/ticket/:id" element={<TicketDetails />} />
            <Route path="/ticketDiscusion/:id" element={<DiscusionTicket />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

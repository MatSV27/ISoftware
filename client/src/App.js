import React from 'react';
import './App.css';
import DeleteUser from './components/deleteUser';
import ModificarUsuario from './components/modificarUsuario';
import FormModUsuario from './components/formModUsuario'
import LoginSistema from './components/loginSistema';
import MenuPrincipal from './components/menuPrincipal';


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
            {/* Rutas de ejemplo para las funcionalidades del menú */}
            {/* <Route path="/generarTicket" element={<GenerarTicket />} />
            <Route path="/visualizarTicket" element={<VisualizarTicket />} />
            <Route path="/ticketSinAsignar" element={<TicketSinAsignar />} />
            <Route path="/administrarUsuarios" element={<AdministrarUsuarios />} /> */}
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

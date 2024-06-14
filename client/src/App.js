import logo from './logo.svg';
import './App.css';
import DeleteUser from './components/deleteUser';
import ModificarUsuario from './components/modificarUsuario';
import FormModUsuario from './components/formModUsuario'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/deleteUsers" element= {<DeleteUser />} />
        <Route path="/modificarUsuario" element= {<ModificarUsuario />} />
        <Route path="/modificarUsuario/:id" element= {<FormModUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

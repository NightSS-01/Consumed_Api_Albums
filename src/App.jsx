import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import ListaAlbumes from './pages/ListaAlbumes';
import CrearAlbum from './pages/CrearAlbum';
function App(){
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
        <span className="navbar-brand">Gestor Álbumes</span>
        <div className="navbar-nav">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'}>
            Ver Álbumes
          </NavLink>
          <NavLink to="/crear" className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'}>
            Nuevo Álbum
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ListaAlbumes/>} />
        <Route path="/crear" element={<CrearAlbum/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
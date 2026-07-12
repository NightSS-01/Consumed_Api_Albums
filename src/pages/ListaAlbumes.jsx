import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom"
import albumesAPi from "../api/albumesApi";
import AlbumCard from "../components/AlbumCard";  
  
export default function ListaAlbumes(){

  //variables de estado del componente
  const [albums, setAlbums] = useState([]); //useState({}) por que su valor iniciar es una lista vacia
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const alEliminar = async (id) => {
    if (!confirm(`¿Estás seguro que seas eliminar la nota ${id}?`)) return;
    try{
      await albumesAPi.delete(`albums/${id}/`);
      setAlbums((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError("Error al Eliminar el abum");1
    }
  };
  useEffect(() => {
    albumesAPi.get('albums/')
      .then(({data})=> setAlbums(data))
      .catch(() => setError ('Error al cargar los albums') )
      .finally (() => setCargando(false));
  },[]);
  if (cargando) return (
    <div className="container mt -5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando</span>
      </div>
      <p className="mt-2 text-muted">Cargando albums</p>
    </div>
  );
  if (error) return(
    <div className="container mt-4">
            <div className="alert alert-danger">{error}</div>
        </div>    
  );
  

  return(
    <div className="container mt-4">
      <h2 className="mb-4">Álbumes Disponibles</h2>
      
        {albums.length === 0 ? (<div className="alert alert-info">
          No hay álbumes. <link to="/crear"> Agrega el primer album </link> </div>
      ) : (
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Artista</th>
              <th>Género</th>
              <th>Titulo</th>
              <th>Publicación</th>
              <th>Minutos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} onEliminar={alEliminar} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
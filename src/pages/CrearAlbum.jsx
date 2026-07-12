import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import albumesAPi from '../api/albumesApi';

export default function CrearAlbum() {
  const [form, setForm] = useState({ titulo:'', publicacion:'', minutos:'', artista_nombre:'', genero_nombre:''});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.artista_nombre.trim()){
      setError('El titulo y el nombre del artista no pueden estar vacios')
      return;
    }
    try {

      // envia el post a artistas/ con el nombre: "algo" y el backen crea el artista y
      // devuelve el obtjeto completo incluyendo su nuevo id 
      // se haria destructuring {data: nuevoArtista}
      // el cual seria capturado en la const {data: nuevoArtista} para luego usarse en el post de albums
      const {data: nuevoArtista} = await albumesAPi.post('artistas/', {
        nombre: form.artista_nombre.trim(),
      });

      //lo mismo que se hizo en artista pero esta ves para generos
      const {data: nuevoGenero} = await albumesAPi.post('generos/', {
        nombre: form.genero_nombre.trim(),
      });

      //se subo este tipo de submit ya que se se usara solamente ...form este daria un error 400
      // ya que subira todos los campos de valores y las variables artista_nombre
      // o nombre_genero, no existen en la api por el cual daria un error 
      await albumesAPi.post('albums/', {
        titulo: form.titulo,
        publicacion: form.publicacion,
        minutos: form.minutos,
        artista: nuevoArtista.id, // lo que se obtuvo de el destructuring {data: nuevoArtista}
        genero:[nuevoGenero.id], /* exactamente lo mismo que artista pero se usa [nuevoGenero] 
        ya que el backend es una relacion de muchos a muchos  osea que siempre espera un array
        aunque tenga un solo elemento... posdt*/
      });
      navigate('/');
    } catch (err) {
        const mensaje = err.response?.data?.message || 'Error al crear album ';
        setError(JSON.stringify(mensaje));
    }
  };
  return (
    <div className="container mt-4" style={{ maxWidth: '520px' }}>
      <h2 className="mb-4">Nuevo Álbum</h2>
      {error && (
      <div className="alert alert-danger">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Título</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange ={handleChange}
            placeholder="Ej: Diamond Eyes"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Artista</label>
          <input
            type="text"
            name="artista_nombre"
            value={form.artista_nombre}
            onChange={handleChange}
            placeholder="Ej: Deftones"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Género</label>
          <input
            type="text"
            name="genero_nombre"
            value={form.genero_nombre}
            onChange={handleChange}
            placeholder="Ej: Nu-Metal"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Fecha de publicación</label>
          <input
            type="date"
            name="publicacion"
            value={form.publicacion}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Duración (minutos)</label>
          <input
            type="number"
            name="minutos"
            value={form.minutos}
            onChange={handleChange}
            placeholder="Ej: 41"
            className="form-control"
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Guardar Álbum
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={()=> navigate('/')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
import { Link } from "react-router-dom";


export default function AlbumCard({ album, onEliminar}){
  return (
    <tr>
      <td>{album.id}</td>
      <td>{album.artista.nombre}</td>
      {/* artista es un objeto mostramos solo el nombre */}
      <td>
        {album.genero.map(g => g.nombre).join(', ')}
      </td>
      {/* genero es una lista unimos los nombres con coma */}
      <td>{album.titulo}</td>
      <td>{album.publicacion}</td>
      <td>{album.minutos}</td>
      <td>
        {/* onClick llama a la funcion alEliminar pasando el id del album */}
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onEliminar (album.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriaService from '../../services/categoriaService';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar categorías al montar el componente
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const data = await categoriaService.listarCategorias();
      setCategorias(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta categoría?')) {
      try {
        await categoriaService.eliminarCategoria(id);
        // Recargar la lista después de eliminar
        cargarCategorias();
        alert('Categoría eliminada exitosamente');
      } catch (err) {
        alert('Error al eliminar la categoría');
        console.error(err);
      }
    }
  };

  const handleEditar = (id) => {
    navigate(`/categorias/editar/${id}`);
  };

  const handleNueva = () => {
    navigate('/categorias/nueva');
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Listado de Categorías</h2>
        <button 
          className="btn btn-primary"
          onClick={handleNueva}
        >
          <i className="bi bi-plus-circle"></i> Nueva Categoría
        </button>
      </div>

      {categorias.length === 0 ? (
        <div className="alert alert-info">
          No hay categorías registradas. Crea una nueva categoría para comenzar.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.id}</td>
                  <td>{categoria.nombre}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEditar(categoria.id)}
                    >
                      <i className="bi bi-pencil"></i> Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleEliminar(categoria.id)}
                    >
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CategoriaList;

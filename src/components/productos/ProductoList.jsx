import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productoService from '../../services/productoService';
import categoriaService from '../../services/categoriaService';

function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      // Cargar productos y categorías en paralelo
      const [productosData, categoriasData] = await Promise.all([
        productoService.listarProductos(),
        categoriaService.listarCategorias()
      ]);
      
      // Crear un mapa de categorías por ID
      const categoriasMap = {};
      categoriasData.forEach(cat => {
        categoriasMap[cat.id] = cat.nombre;
      });
      
      setProductos(productosData);
      setCategorias(categoriasMap);
      setError(null);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      try {
        await productoService.eliminarProducto(id);
        cargarDatos();
        alert('Producto eliminado exitosamente');
      } catch (err) {
        console.error('Error al eliminar:', err);
        alert('Error al eliminar el producto');
      }
    }
  };

  const handleEditar = (id) => {
    navigate(`/productos/editar/${id}`);
  };

  const handleNuevo = () => {
    navigate('/productos/nuevo');
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
        <h2>Listado de Productos</h2>
        <button 
          className="btn btn-primary"
          onClick={handleNuevo}
        >
          <i className="bi bi-plus-circle"></i> Nuevo Producto
        </button>
      </div>

      {productos.length === 0 ? (
        <div className="alert alert-info">
          No hay productos registrados. Crea un nuevo producto para comenzar.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>S/ {producto.precio.toFixed(2)}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {categorias[producto.categoriaId] || 'Sin categoría'}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEditar(producto.id)}
                    >
                      <i className="bi bi-pencil"></i> Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleEliminar(producto.id)}
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

export default ProductoList;

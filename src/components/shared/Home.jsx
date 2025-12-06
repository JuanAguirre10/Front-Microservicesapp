import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoriaService from '../../services/categoriaService';
import productoService from '../../services/productoService';

function Home() {
  const [stats, setStats] = useState({
    totalCategorias: 0,
    totalProductos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const [categorias, productos] = await Promise.all([
        categoriaService.listarCategorias(),
        productoService.listarProductos()
      ]);
      
      setStats({
        totalCategorias: categorias.length,
        totalProductos: productos.length
      });
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="text-center mb-5">
        <h1 className="display-4">Bienvenido a Microservicios App</h1>
        <p className="lead">Sistema de gestión de Categorías y Productos</p>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <i className="bi bi-folder fs-1 text-primary"></i>
                <h5 className="card-title mt-3">Categorías</h5>
                <p className="display-6">{stats.totalCategorias}</p>
                <p className="card-text text-muted">
                  Total de categorías registradas
                </p>
                <Link to="/categorias" className="btn btn-primary">
                  Ver Categorías
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <i className="bi bi-box-seam fs-1 text-success"></i>
                <h5 className="card-title mt-3">Productos</h5>
                <p className="display-6">{stats.totalProductos}</p>
                <p className="card-text text-muted">
                  Total de productos registrados
                </p>
                <Link to="/productos" className="btn btn-success">
                  Ver Productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Características del Sistema</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Arquitectura de microservicios con Spring Boot
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Frontend desarrollado con React + Vite
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Comunicación entre servicios con Feign Client
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Registro y descubrimiento con Eureka Server
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Validaciones de formularios y manejo de errores
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

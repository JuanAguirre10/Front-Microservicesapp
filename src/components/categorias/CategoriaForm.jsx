import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import categoriaService from '../../services/categoriaService';

function CategoriaForm() {
  const [nombre, setNombre] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // Cargar categoría si estamos en modo edición
useEffect(() => {
  const cargarCategoria = async () => {
    try {
      setLoading(true);
      const data = await categoriaService.obtenerCategoria(id);
      setNombre(data.nombre);
    } catch (err) {
      console.error('Error al cargar la categoría:', err);
      alert('Error al cargar la categoría');
      navigate('/categorias');
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    cargarCategoria();
  }
}, [id, navigate]);

  const validarFormulario = () => {
    const newErrors = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      setLoading(true);
      const categoriaData = { nombre: nombre.trim() };

      if (isEditMode) {
        await categoriaService.actualizarCategoria(id, categoriaData);
        alert('Categoría actualizada exitosamente');
      } else {
        await categoriaService.crearCategoria(categoriaData);
        alert('Categoría creada exitosamente');
      }

      navigate('/categorias');
    } catch (err) {
      alert('Error al guardar la categoría');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigate('/categorias');
  };

  if (loading && isEditMode) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>{isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre de la Categoría <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese el nombre de la categoría"
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback">
                      {errors.nombre}
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancelar}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Guardando...
                      </>
                    ) : (
                      'Guardar'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriaForm;

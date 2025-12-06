import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productoService from '../../services/productoService';
import categoriaService from '../../services/categoriaService';

function ProductoForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoriaId: ''
  });
  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // Cargar categorías y producto (si es edición)
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        // Cargar categorías
        const categoriasData = await categoriaService.listarCategorias();
        setCategorias(categoriasData);

        // Si es modo edición, cargar el producto
        if (id) {
          const productoData = await productoService.obtenerProducto(id);
          setFormData({
            nombre: productoData.producto.nombre,
            precio: productoData.producto.precio.toString(),
            categoriaId: productoData.producto.categoriaId.toString()
          });
        }
      } catch (err) {
        console.error('Error al cargar datos:', err);
        alert('Error al cargar los datos');
        navigate('/productos');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    // Validar precio
    if (!formData.precio) {
      newErrors.precio = 'El precio es obligatorio';
    } else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser un número mayor a 0';
    }

    // Validar categoría
    if (!formData.categoriaId) {
      newErrors.categoriaId = 'Debe seleccionar una categoría';
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
      const productoData = {
        nombre: formData.nombre.trim(),
        precio: parseFloat(formData.precio),
        categoriaId: parseInt(formData.categoriaId)
      };

      if (isEditMode) {
        await productoService.actualizarProducto(id, productoData);
        alert('Producto actualizado exitosamente');
      } else {
        await productoService.crearProducto(productoData);
        alert('Producto creado exitosamente');
      }

      navigate('/productos');
    } catch (err) {
      console.error('Error al guardar:', err);
      alert('Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigate('/productos');
  };

  if (loading && categorias.length === 0) {
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
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>{isEditMode ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Campo Nombre */}
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre del Producto <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ingrese el nombre del producto"
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback">
                      {errors.nombre}
                    </div>
                  )}
                </div>

                {/* Campo Precio */}
                <div className="mb-3">
                  <label htmlFor="precio" className="form-label">
                    Precio <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">S/</span>
                    <input
                      type="number"
                      step="0.01"
                      className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                      id="precio"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      placeholder="0.00"
                    />
                    {errors.precio && (
                      <div className="invalid-feedback">
                        {errors.precio}
                      </div>
                    )}
                  </div>
                </div>

                {/* Campo Categoría */}
                <div className="mb-3">
                  <label htmlFor="categoriaId" className="form-label">
                    Categoría <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.categoriaId ? 'is-invalid' : ''}`}
                    id="categoriaId"
                    name="categoriaId"
                    value={formData.categoriaId}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.categoriaId && (
                    <div className="invalid-feedback">
                      {errors.categoriaId}
                    </div>
                  )}
                </div>

                {/* Botones */}
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

export default ProductoForm;

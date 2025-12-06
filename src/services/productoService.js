import axios from 'axios';

const API_URL = 'http://localhost:8082/api/productos';  // ← Cambiar a 8082

const productoService = {
  // Listar todos los productos
  listarProductos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al listar productos:', error);
      throw error;
    }
  },

  // Obtener producto por ID (con información de categoría)
  obtenerProducto: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },

  // Crear nuevo producto
  crearProducto: async (producto) => {
    try {
      const response = await axios.post(API_URL, producto);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  },

  // Actualizar producto
  actualizarProducto: async (id, producto) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, producto);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  },

  // Eliminar producto
  eliminarProducto: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }
};

export default productoService;

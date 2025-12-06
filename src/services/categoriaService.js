import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categorias';

const categoriaService = {
  // Listar todas las categorías
  listarCategorias: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al listar categorías:', error);
      throw error;
    }
  },

  // Obtener categoría por ID
  obtenerCategoria: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener categoría:', error);
      throw error;
    }
  },

  // Crear nueva categoría
  crearCategoria: async (categoria) => {
    try {
      const response = await axios.post(API_URL, categoria);
      return response.data;
    } catch (error) {
      console.error('Error al crear categoría:', error);
      throw error;
    }
  },

  // Actualizar categoría
  actualizarCategoria: async (id, categoria) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, categoria);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      throw error;
    }
  },

  // Eliminar categoría
  eliminarCategoria: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      throw error;
    }
  }
};

export default categoriaService;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './components/shared/Home'
import CategoriaList from './components/categorias/CategoriaList'
import CategoriaForm from './components/categorias/CategoriaForm'
import ProductoList from './components/productos/ProductoList'
import ProductoForm from './components/productos/ProductoForm'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <i className="bi bi-gear-fill me-2"></i>
              Microservicios App
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="bi bi-house-fill me-1"></i>
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categorias">
                    <i className="bi bi-folder-fill me-1"></i>
                    Categorías
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">
                    <i className="bi bi-box-seam-fill me-1"></i>
                    Productos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<CategoriaList />} />
            <Route path="/categorias/nueva" element={<CategoriaForm />} />
            <Route path="/categorias/editar/:id" element={<CategoriaForm />} />
            <Route path="/productos" element={<ProductoList />} />
            <Route path="/productos/nuevo" element={<ProductoForm />} />
            <Route path="/productos/editar/:id" element={<ProductoForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

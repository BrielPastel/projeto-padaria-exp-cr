import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import ProdutosList from './components/ProdutosList'
import ProdutoDetail from './components/ProdutoDetail'
import ProdutoForm from './components/ProdutoForm'

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Padaria Delícias</h1>
          <nav>
            <Link to="/" className="nav-link">Produtos</Link>
            <Link to="/adicionar" className="nav-link">Adicionar Produto</Link>
          </nav>
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<ProdutosList />} />
            <Route path="/produto/:id" element={<ProdutoDetail />} />
            <Route path="/adicionar" element={<ProdutoForm />} />
            <Route path="/editar/:id" element={<ProdutoForm />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2025 Padaria Delícias - Sistema de Gerenciamento</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ProdutosList() {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoria, setCategoria] = useState('')
  
  const categorias = ['Todos', 'Pães', 'Bolos', 'Doces', 'Salgados', 'Bebidas']

  const fetchProdutos = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8800/produtos')
      setProdutos(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Erro ao buscar produtos:', err)
      setError('Falha ao carregar produtos. Por favor, tente novamente.')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProdutos()
  }, [])

  const handleDelete = async (idproduto) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await axios.delete(`http://localhost:8800/produtos/${idproduto}`)
        fetchProdutos()
      } catch (err) {
        console.error('Erro ao excluir produto:', err)
        alert('Erro ao excluir produto')
      }
    }
  }

  // Filtrar produtos
  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = categoria === '' || categoria === 'Todos' || produto.categoria === categoria
    return matchesSearch && matchesCategoria
  })

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProdutos.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) return <div className="loading">Carregando produtos...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="produtos-list">
      <h2>Catálogo de Produtos</h2>
      
      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        
        <div className="categoria-filter">
          <select 
            value={categoria} 
            onChange={(e) => {
              setCategoria(e.target.value)
              setCurrentPage(1)
            }}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredProdutos.length === 0 ? (
        <div className="no-products">Nenhum produto encontrado</div>
      ) : (
        <div className="produtos-grid">
          {currentItems.map(produto => (
            <div key={produto.idproduto} className="produto-card">
              <h3>{produto.nome}</h3>
              <p className="categoria">{produto.categoria}</p>
              <p className="preco">R$ {Number(produto.preco).toFixed(2)}</p>
              <p className="estoque">Estoque: {produto.estoque} unidades</p>
              
              <div className="produto-actions">
                <Link to={`/produto/${produto.idproduto}`} className="btn btn-view">
                  Ver Detalhes
                </Link>
                <Link to={`/editar/${produto.idproduto}`} className="btn btn-edit">
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(produto.idproduto)} 
                  className="btn btn-delete"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Paginação */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="page-btn"
          >
            &laquo; Anterior
          </button>
          
          <span className="page-info">
            Página {currentPage} de {totalPages}
          </span>
          
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Próxima &raquo;
          </button>
        </div>
      )}
    </div>
  )
}

export default ProdutosList
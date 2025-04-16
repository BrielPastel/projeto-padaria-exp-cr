import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function ProdutoDetail() {
  const { id } = useParams()
  const [produto, setProduto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:8800/produtos/${id}`)
        setProduto(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Erro ao buscar detalhes do produto:', err)
        setError('Falha ao carregar detalhes do produto. Por favor, tente novamente.')
        setLoading(false)
      }
    }

    fetchProduto()
  }, [id])

  if (loading) return <div className="loading">Carregando detalhes do produto...</div>
  if (error) return <div className="error-message">{error}</div>
  if (!produto) return <div className="error-message">Produto não encontrado</div>

  return (
    <div className="produto-detail">
      <div className="produto-header">
        <h2>{produto.nome}</h2>
        <span className="categoria-badge">{produto.categoria}</span>
      </div>

      <div className="produto-info">
        <div className="info-section">
          <h3>Detalhes</h3>
          <div className="info-group">
            <label>Preço:</label>
            <p className="preco-detail">R$ {Number(produto.preco).toFixed(2)}</p>
          </div>
          <div className="info-group">
            <label>Estoque:</label>
            <p>{produto.estoque} unidades</p>
          </div>
          <div className="info-group">
            <label>Data de Cadastro:</label>
            <p>{new Date(produto.data_cadastro).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>

        <div className="info-section">
          <h3>Descrição</h3>
          <p className="descricao">{produto.descricao || 'Nenhuma descrição disponível'}</p>
        </div>

        <div className="info-section">
          <h3>Ingredientes</h3>
          <p className="ingredientes">{produto.ingredientes || 'Nenhum ingrediente listado'}</p>
        </div>
      </div>

      <div className="produto-actions">
        <Link to="/" className="btn btn-back">
          Voltar para Listagem
        </Link>
        <Link to={`/editar/${produto.idproduto}`} className="btn btn-edit">
          Editar Produto
        </Link>
      </div>
    </div>
  )
}

export default ProdutoDetail
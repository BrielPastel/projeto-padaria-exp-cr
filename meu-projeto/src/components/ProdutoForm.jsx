import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function ProdutoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(false)
  
  const [produto, setProduto] = useState({
    nome: '',
    categoria: 'Pães',
    preco: '',
    descricao: '',
    ingredientes: '',
    estoque: 0
  })

  const categorias = ['Pães', 'Bolos', 'Doces', 'Salgados', 'Bebidas']
  
  const isEdicao = !!id

  useEffect(() => {
    if (isEdicao) {
      const fetchProduto = async () => {
        try {
          setLoading(true)
          const response = await axios.get(`http://localhost:8800/produtos/${id}`)
          setProduto(response.data)
          setLoading(false)
        } catch (err) {
          console.error('Erro ao buscar produto para edição:', err)
          setError('Falha ao carregar dados do produto. Por favor, tente novamente.')
          setLoading(false)
        }
      }

      fetchProduto()
    }
  }, [id, isEdicao])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduto(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validações básicas
    if (!produto.nome || !produto.categoria || !produto.preco) {
      setError('Nome, categoria e preço são campos obrigatórios')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      if (isEdicao) {
        await axios.put(`http://localhost:8800/produtos/${id}`, produto)
      } else {
        await axios.post('http://localhost:8800/produtos', produto)
      }
      
      setFormSuccess(true)
      setLoading(false)
      
      // Redirecionar após 1 segundo
      setTimeout(() => {
        navigate('/')
      }, 1000)
      
    } catch (err) {
      console.error('Erro ao salvar produto:', err)
      setError('Erro ao salvar produto. Por favor, tente novamente.')
      setLoading(false)
    }
  }

  if (loading && isEdicao) return <div className="loading">Carregando dados do produto...</div>

  return (
    <div className="produto-form-container">
      <h2>{isEdicao ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      {formSuccess && <div className="success-message">Produto salvo com sucesso!</div>}
      
      <form onSubmit={handleSubmit} className="produto-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nome">Nome do Produto*</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={produto.nome}
              onChange={handleChange}
              required
              placeholder="Ex: Pão Francês"
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoria*</label>
            <select
              id="categoria"
              name="categoria"
              value={produto.categoria}
              onChange={handleChange}
              required
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="preco">Preço (R$)*</label>
            <input
              type="number"
              id="preco"
              name="preco"
              value={produto.preco}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="estoque">Estoque (unidades)</label>
            <input
              type="number"
              id="estoque"
              name="estoque"
              value={produto.estoque}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={produto.descricao || ''}
              onChange={handleChange}
              rows="3"
              placeholder="Descreva o produto..."
            />
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="ingredientes">Ingredientes</label>
            <textarea
              id="ingredientes"
              name="ingredientes"
              value={produto.ingredientes || ''}
              onChange={handleChange}
              rows="3"
              placeholder="Liste os ingredientes..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-cancel"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-submit"
            disabled={loading}
          >
            {loading ? 'Salvando...' : isEdicao ? 'Atualizar Produto' : 'Adicionar Produto'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProdutoForm
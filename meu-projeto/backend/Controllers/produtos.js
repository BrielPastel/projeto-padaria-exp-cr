import { db } from "../db.js";

// Listar todos os produtos
export const getProdutos = (req, res) => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Buscar um produto específico
export const getProduto = (req, res) => {
  const { idproduto } = req.params;
  const q = "SELECT * FROM produtos WHERE idproduto = ?";

  db.query(q, [idproduto], (err, data) => {
    if (err) return res.status(500).json(err);
    
    if (data.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    
    return res.status(200).json(data[0]);
  });
};

// Atualizar um produto
export const updateProduto = (req, res) => {
  const { idproduto } = req.params;
  const { nome, categoria, preco, descricao, ingredientes, estoque } = req.body;

  // Validações
  if (!nome || !categoria || !preco) {
    return res.status(400).json({ message: "Nome, categoria e preço são obrigatórios" });
  }

  const q = `UPDATE produtos SET nome = ?, categoria = ?, preco = ?, 
             descricao = ?, ingredientes = ?, estoque = ? 
             WHERE idproduto = ?`;

  db.query(q, [nome, categoria, preco, descricao, ingredientes, estoque, idproduto], (err, result) => {
    if (err) return res.status(500).json(err);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.status(200).json({ message: "Produto atualizado com sucesso" });
  });
};

// Excluir um produto
export const deleteProduto = (req, res) => {
  const { idproduto } = req.params;

  const q = "DELETE FROM produtos WHERE idproduto = ?";

  db.query(q, [idproduto], (err, result) => {
    if (err) return res.status(500).json(err);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.status(200).json({ message: "Produto excluído com sucesso" });
  });
};

// Criar um novo produto
export const createProduto = (req, res) => {
  const { nome, categoria, preco, descricao, ingredientes, estoque } = req.body;

  // Validações
  if (!nome || !categoria || !preco) {
    return res.status(400).json({ message: "Nome, categoria e preço são obrigatórios" });
  }

  const q = `INSERT INTO produtos (nome, categoria, preco, descricao, ingredientes, estoque) 
             VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(q, [nome, categoria, preco, descricao, ingredientes, estoque], (err, result) => {
    if (err) {
      console.error("Erro ao criar produto:", err);
      return res.status(500).json({ 
        message: "Erro ao criar produto", 
        error: err 
      });
    }

    return res.status(201).json({ 
      message: "Produto criado com sucesso", 
      idproduto: result.insertId 
    });
  });
};
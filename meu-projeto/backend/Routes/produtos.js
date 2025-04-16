import express from "express";
import { 
  getProdutos, 
  getProduto,
  updateProduto, 
  deleteProduto, 
  createProduto 
} from "../Controllers/produtos.js";

const router = express.Router()

router.get("/", getProdutos)
router.get("/:idproduto", getProduto)
router.post("/", createProduto)
router.put("/:idproduto", updateProduto)
router.delete("/:idproduto", deleteProduto)

export default router
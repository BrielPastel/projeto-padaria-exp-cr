import express from "express";
import produtoRoutes from "./Routes/produtos.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/produtos", produtoRoutes);

app.listen(8800, () => {
  console.log("Servidor backend rodando em http://localhost:8800");
});
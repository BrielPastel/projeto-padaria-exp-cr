# Para rodar o projeto

## Primeiramente trocar a senha e o nome da db no meu-projeto/backend/db.js

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sua-senha",
    database: "sua-db"
});

## Iniciar o backend (na pasta backend)
node index.js

## Iniciar o frontend (na pasta raiz)
npm run dev

## O banco de dados desse projeto foi conectado com o back-end usando Xampp

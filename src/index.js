require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

/**
 * Inicialização do express
 */
const app = express();

/**
 * Middlewares
 */
app.use(express.json()); // Permitir que dados
app.use(cors());

/**
 * Conexão com banco de dados
 */
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

/**
 * Rotas
 */
app.use(routes);

/**
 * Inicialização do servidor
 */
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));

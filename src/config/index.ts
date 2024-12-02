import "dotenv/config";
import express from "express";
import errorHandler from "../utils/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const port = process.env.PORT || 3000;
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// inserir as rotas aqui

app.use(errorHandler);

async function startServer() {
  console.log("Booting system... 💻");
  try {
    // função de conexao com o db viria aqui
    await prisma.$connect();
    console.log("Connected to MySQL successfully 💾");
    app.listen(port, function () {
      console.log(`Server is running on port ${port} 🤖`);
    });
  } catch (error) {
    console.error("Error during startup:", error);
    process.exit(1);
  }
}
startServer();

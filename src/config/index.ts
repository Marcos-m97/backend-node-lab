import "dotenv/config";
import express from "express";
import prisma from "./prisma.js";
import errorHandler from "../middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";
import Seed from "../seeds/seed.js";
import loginRouter from "../routes/login.routes.js";
const port = process.env.PORT || 3000;
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(loginRouter)
// inserir as rotas aqui

app.use(errorHandler);

const seed = new Seed();

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to MySQL successfully");
    await seed.seeder();
    app.listen(port, function () {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error during startup:", error);
    process.exit(1);
  }
}
startServer();

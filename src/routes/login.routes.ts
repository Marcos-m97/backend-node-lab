import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import LoginRepositorie from "../repositories/login.repositories.js";
import LoginService from "../services/login.services.js";
import LoginController from "../controllers/login.controller.js";

const loginRepositorie = new LoginRepositorie();
const loginService = new LoginService(loginRepositorie);
const loginController = new LoginController(loginService);

const loginRouter = Router();

loginRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await loginController.login(req, res, next);
    } catch (error) {
      throw error;
    }
  }
);

export default loginRouter;

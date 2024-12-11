
import { Request, Response, NextFunction } from "express";
import LoginService from "../services/login.services.js";
import { LoginRequest} from "../definitions/login.definitions.js";

class LoginController {
  constructor(private loginservice: LoginService) {}

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const authData: LoginRequest = req.body;
      
      const newToken = await this.loginservice.verifyUser(authData);
      return res.status(200).json(newToken);
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
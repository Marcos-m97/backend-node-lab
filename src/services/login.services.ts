import Jwt from "jsonwebtoken";
import { AppErrors } from "../middlewares/errorHandler.js";
import { comparePassword } from "../utils/auth.functions.js";
import LoginRepositorie from "../repositories/login.repositories.js";
import { LoginRequest, loginResponse } from "../definitions/login.definitions.js";



class LoginService {
 
  constructor(public loginRepositorie: LoginRepositorie) {}
  
  public async verifyUser(loginInput: LoginRequest): Promise<loginResponse> {
    const authUser = await this.loginRepositorie.findByEmail(loginInput.email);
    if (!authUser) {
      throw new AppErrors("invalid credentials", 400);
    }

    const isValidPassword = comparePassword(
      loginInput.password,
      authUser.password
    );
    if (!isValidPassword) {
      throw new AppErrors("invalid credentials", 400);
    }

    const token = Jwt.sign(
      // aqui no payload deve ser passado os dados que foram cadstrados no banco nao o que vem da req
      { name: authUser.name, id: authUser.id, role: authUser.role }, // os dados que eu passar aqui no payload sao o que preenchem o req.user no token e que tornam possivel identificar que usuario esta logado
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const validToken: loginResponse = {
      accessToken: token,
      expiresIn: 6000,
    };

    return validToken;
  }
}
export default LoginService;

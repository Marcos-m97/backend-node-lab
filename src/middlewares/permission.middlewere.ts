import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middlewere";
import { JwtPayload } from "jsonwebtoken";

function verifyRole(roleList: string[]) {  
  return function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userRole = (req.user as JwtPayload).role;
      if (roleList.includes(userRole)) {
        next();
      } else {
        res.status(403).json({ error: "Usser cant acess this route" });
      }
    } catch (error) {
      res.status(403).json({ error: "internal server error" });
    }
  };
}

export default verifyRole;

/* exemplo de como usar na rota: 

verifyRole["instructor", "admin"]

assim só  usuarios com o role instrutores e admins tem acesso a rota.
*/
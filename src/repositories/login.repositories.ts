import { User } from "@prisma/client";
import prisma from "../config/prisma";
import { AppErrors } from "../middlewares/errorHandler";

class LoginRepositorie {
  public async findByEmail(userEmail: string): Promise<User | null> {
    try {
      const registered_User = await prisma.user.findUnique({
        where: { email: userEmail },
      });
      return registered_User;
    } catch (error) {
      throw new AppErrors("error can not find user", 400);
    }
  }
}
export default LoginRepositorie
import prisma from "../config/prisma.js";
import {
  UserRole,
  userCreation,
} from "../definitions/user.definitions/User.Roles.js";
import { AppErrors } from "../utils/errorHandler.js";

class Seed {
  
    //  cria o admin user se ele nao exisitr.
  public async createAdminUser(): Promise<void> {
    if (!process.env.DEFAULT_EMAIL) {
      throw new AppErrors(
        "User seed error, Check your DEFAULT_EMAIL configuration in .env.",
        400
      );
    }

    try {
      const existingSeed = await prisma.user.findUnique({
        where: { email: process.env.DEFAULT_EMAIL },
      });

      

      if (!existingSeed) {
        const userSeed: userCreation = {
          name: process.env.DEFAULT_NAME!,
          email: process.env.DEFAULT_EMAIL!,
          password: process.env.DEFAULT_PASSWORD!,
          role: UserRole.SYSTEMADMIN,
        };

        await prisma.user.create({ data: userSeed });
        console.log("Admin user seed registered.");
      } 
    } catch (error) {
      throw new AppErrors("Error while creating the admin user seed.", 404);
    }
  }

  // executa todas as seeds
  public async seeder() {
    try {
      await this.createAdminUser();
    } catch (error) {
      throw new AppErrors("Failed to run the seed scripts.", 404);
    }
  }
}

export default Seed;

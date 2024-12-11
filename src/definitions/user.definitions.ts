export enum UserRole {
  SYSTEMADMIN = "systemadmin",
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

export type userCreation = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

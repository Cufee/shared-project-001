export interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  role: UserRole;
  passwordResetToken: string;
}

export type UserRole = "admin" | "moderator" | "user";

export interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  company: string;
  role: UserRole;
}

export interface CompanyReference {
  id: string;
  name: string;
}

export type UserRole = "admin" | "moderator" | "user";

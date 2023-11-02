export interface User {
  id: string;
  name: string;
  surname: string;
  username: string;
  role: UserRole;
  passwordResetToken: string;
  ownedCompany?: CompanyReference;
  worksFor?: CompanyReference;
}

export interface CompanyReference {
  id: string;
  name: string;
}

export type UserRole = "admin" | "moderator" | "user";

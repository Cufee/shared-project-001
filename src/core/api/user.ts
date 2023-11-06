import { getStorageItem } from "../storage/secure";
import { ApiResponse } from "../types/Api";
import { User } from "../types/User";
import { apiRequest } from "./request";

function CurrentUser(token: string): Promise<ApiResponse<User>> {
  return apiRequest<User>("GET", "/user/me", null, token);
}

function UpdatePassword(currentPassword: string, newPassword: string) {
  const token = getStorageItem("token") as string;

  return apiRequest<User>(
    "PATCH",
    "/user/change-password",
    { password: currentPassword, newPassword },
    token
  );
}

function UpdateUsername(username: string) {
  const token = getStorageItem("token") as string;

  return apiRequest<User>(
    "PATCH",
    "/user/change-username",
    { username },
    token
  );
}

export { CurrentUser, UpdatePassword, UpdateUsername };

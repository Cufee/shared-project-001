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
    JSON.stringify({ password: currentPassword, newPassword }),
    token,
    { contentType: "application/json" }
  );
}

function UpdateUsername(username: string) {
  const token = getStorageItem("token") as string;

  return apiRequest<User>(
    "PATCH",
    "/user/change-username",
    JSON.stringify({ username }),
    token,
    { contentType: "application/json" }
  );
}

export { CurrentUser, UpdatePassword, UpdateUsername };
